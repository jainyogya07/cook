"""Email/password auth against Supabase Postgres, with free/pro plans."""

import base64
import hashlib
import hmac
import secrets
import time
from typing import Any

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from app.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])


class Credentials(BaseModel):
    email: str
    password: str
    name: str | None = None


def _user_payload(row: Any) -> dict[str, Any]:
    plan = row[3] if len(row) > 3 and row[3] else "free"
    return {"id": row[0], "email": row[1], "name": row[2], "plan": plan}


def _auth_dsn() -> str:
    """Supabase direct db hosts are IPv6-only; Render cannot reach them."""
    from urllib.parse import quote, urlparse

    url = settings.AUTH_DATABASE_URL.strip()
    parsed = urlparse(url)
    host = parsed.hostname or ""
    if host.startswith("db.") and host.endswith(".supabase.co"):
        ref = host.removeprefix("db.").removesuffix(".supabase.co")
        user = parsed.username or "postgres"
        if "." not in user:
            user = f"{user}.{ref}"
        password = quote(parsed.password or "", safe="")
        return (
            f"postgresql://{user}:{password}"
            f"@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require"
        )
    return url


def _db():
    try:
        import psycopg
    except ImportError as exc:
        raise HTTPException(503, "Postgres driver is not installed. Run: pip install -r backend/requirements.txt") from exc
    try:
        connection = psycopg.connect(_auth_dsn(), connect_timeout=8)
        connection.execute("""
          CREATE TABLE IF NOT EXISTS atmos_users (
            id BIGSERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            plan TEXT NOT NULL DEFAULT 'free',
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          )
        """)
        connection.execute("ALTER TABLE atmos_users ADD COLUMN IF NOT EXISTS plan TEXT NOT NULL DEFAULT 'free'")
        connection.commit()
        _ensure_seed(connection)
        return connection
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(503, f"Database unavailable. Check AUTH_DATABASE_URL. ({exc})") from exc


def _ensure_seed(connection) -> None:
    email = settings.ATMOS_SEED_EMAIL.lower().strip()
    with connection.cursor() as cursor:
        cursor.execute("SELECT id FROM atmos_users WHERE email = %s", (email,))
        existing = cursor.fetchone()
        if existing:
            cursor.execute(
                "UPDATE atmos_users SET plan = %s, name = %s, password_hash = %s WHERE email = %s",
                (settings.ATMOS_SEED_PLAN, settings.ATMOS_SEED_NAME, _hash_password(settings.ATMOS_SEED_PASSWORD), email),
            )
        else:
            cursor.execute(
                "INSERT INTO atmos_users (email, name, password_hash, plan) VALUES (%s, %s, %s, %s)",
                (email, settings.ATMOS_SEED_NAME, _hash_password(settings.ATMOS_SEED_PASSWORD), settings.ATMOS_SEED_PLAN),
            )
    connection.commit()


def _hash_password(password: str, salt: bytes | None = None) -> str:
    salt = salt or secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 210_000)
    return f"pbkdf2_sha256$210000${base64.urlsafe_b64encode(salt).decode()}${base64.urlsafe_b64encode(digest).decode()}"


def _verify_password(password: str, encoded: str) -> bool:
    try:
        algorithm, rounds, salt, expected = encoded.split("$", 3)
        actual = hashlib.pbkdf2_hmac("sha256", password.encode(), base64.urlsafe_b64decode(salt), int(rounds))
        return algorithm == "pbkdf2_sha256" and hmac.compare_digest(base64.urlsafe_b64encode(actual).decode(), expected)
    except (ValueError, TypeError):
        return False


def _token(user_id: int, email: str) -> str:
    payload = f"{user_id}:{email}:{int(time.time()) + 60 * 60 * 24 * 14}"
    signature = hmac.new(settings.AUTH_SECRET.encode(), payload.encode(), hashlib.sha256).hexdigest()
    return base64.urlsafe_b64encode(f"{payload}:{signature}".encode()).decode()


def _user_from_token(request: Request) -> dict[str, Any]:
    raw = request.headers.get("Authorization", "").removeprefix("Bearer ").strip()
    try:
        decoded = base64.urlsafe_b64decode(raw.encode()).decode().split(":")
        user_id, email, expiry, signature = decoded
        payload = f"{user_id}:{email}:{expiry}"
        if int(expiry) < int(time.time()) or not hmac.compare_digest(signature, hmac.new(settings.AUTH_SECRET.encode(), payload.encode(), hashlib.sha256).hexdigest()):
            raise ValueError
        return {"id": int(user_id), "email": email}
    except (ValueError, TypeError, IndexError, UnicodeError):
        raise HTTPException(401, "Session expired. Please sign in again.")


@router.post("/signup")
def signup(credentials: Credentials):
    if "@" not in credentials.email or "." not in credentials.email.rsplit("@", 1)[-1]:
        raise HTTPException(400, "Enter a valid email address.")
    if len(credentials.password) < 8:
        raise HTTPException(400, "Password must be at least 8 characters.")
    connection = _db()
    try:
        name = (credentials.name or credentials.email.split("@")[0]).strip()[:80]
        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO atmos_users (email, name, password_hash, plan) VALUES (%s, %s, %s, %s) RETURNING id, email, name, plan",
                (credentials.email.lower(), name, _hash_password(credentials.password), "free"),
            )
            user = cursor.fetchone()
        connection.commit()
        return {"token": _token(user[0], user[1]), "user": _user_payload(user)}
    except Exception as exc:
        connection.rollback()
        if "duplicate key" in str(exc).lower() or "unique" in str(exc).lower():
            raise HTTPException(409, "An account with this email already exists.") from exc
        raise HTTPException(500, "Could not create the account.") from exc
    finally:
        connection.close()


@router.post("/login")
def login(credentials: Credentials):
    connection = _db()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT id, email, name, plan, password_hash FROM atmos_users WHERE email = %s", (credentials.email.lower(),))
            user = cursor.fetchone()
        if not user or not _verify_password(credentials.password, user[4]):
            raise HTTPException(401, "Incorrect email or password.")
        return {"token": _token(user[0], user[1]), "user": _user_payload(user)}
    finally:
        connection.close()


@router.get("/me")
def me(request: Request):
    identity = _user_from_token(request)
    connection = _db()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT id, email, name, plan FROM atmos_users WHERE id = %s", (identity["id"],))
            user = cursor.fetchone()
        if not user:
            raise HTTPException(401, "Account no longer exists.")
        return {"user": _user_payload(user)}
    finally:
        connection.close()
