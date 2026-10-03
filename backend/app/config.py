import os
from pathlib import Path
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent.parent


def _load_dotenv() -> None:
    env_path = BASE_DIR / ".env"
    if not env_path.exists():
        return
    for raw in env_path.read_text().splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


_load_dotenv()

class Settings(BaseModel):
    PROJECT_NAME: str = "AI-Driven Extreme Weather Anomaly Tracking API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/weather"
    API_V1_PREFIX: str = "/api/v1"
    
    # Storage and Caching
    DATA_DIR: Path = BASE_DIR / "data" / "raw"
    CACHE_DIR: Path = BASE_DIR / "data" / "cache"
    ARTIFACT_STORAGE_DIR: str = os.getenv("ARTIFACT_STORAGE_DIR", str(BASE_DIR / "weather_artifacts"))
    EVENT_DATABASE_URL: str = os.getenv("EVENT_DATABASE_URL", f"sqlite:///{BASE_DIR}/weather_events.db")
    AUTH_DATABASE_URL: str = os.getenv("AUTH_DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/atmos4d")
    AUTH_SECRET: str = os.getenv("AUTH_SECRET", "change-this-local-secret")
    ATMOS_SEED_EMAIL: str = os.getenv("ATMOS_SEED_EMAIL", "seed@atmos4d.ai")
    ATMOS_SEED_NAME: str = os.getenv("ATMOS_SEED_NAME", "ATMOS Seed")
    ATMOS_SEED_PASSWORD: str = os.getenv("ATMOS_SEED_PASSWORD", "Yogyajain@26")
    ATMOS_SEED_PLAN: str = os.getenv("ATMOS_SEED_PLAN", "pro")
    
    # Security and Keys
    WEATHER_API_KEY: str = os.getenv("WEATHER_API_KEY", "change-me-in-production")
    WEATHER_API_KEYS: str = os.getenv("WEATHER_API_KEYS", "")
    RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
    
    # AI Models & Execution Mode
    GNN_MODEL_PATH: str = os.getenv("GNN_MODEL_PATH", "")
    DIFFUSION_MODEL_PATH: str = os.getenv("DIFFUSION_MODEL_PATH", "")
    GPU_CONCURRENCY: int = int(os.getenv("GPU_CONCURRENCY", "1"))
    INFERENCE_EXECUTION_MODE: str = os.getenv("INFERENCE_EXECUTION_MODE", "local")
    REDIS_URL: str = os.getenv("REDIS_URL", "")
    
    # News API Key (NewsAPI.org key if provided, otherwise GDELT / ReliefWeb fallback)
    NEWS_API_KEY: str = os.getenv("NEWS_API_KEY", "")
    NEWS_PROVIDER_FALLBACK: bool = os.getenv("NEWS_PROVIDER_FALLBACK", "True").lower() in ("true", "1")
    
    # Coordinates for key meteorological regions in India / South Asia
    REGIONS: dict = {
        "bay_of_bengal": {"name": "Bay of Bengal (Cyclone Basin)", "bbox": [80.0, 8.0, 95.0, 22.0]},
        "arabian_sea": {"name": "Arabian Sea Basin", "bbox": [65.0, 10.0, 75.0, 24.0]},
        "north_india": {"name": "North India (Heatwave/Coldwave zone)", "bbox": [72.0, 25.0, 85.0, 35.0]},
        "coastal_odisha": {"name": "Odisha Coastal Zone", "bbox": [83.0, 18.0, 87.5, 22.5]},
        "western_ghats": {"name": "Western Ghats (Orographic Rain)", "bbox": [73.0, 8.0, 77.0, 20.0]}
    }

    def init_dirs(self):
        self.DATA_DIR.mkdir(parents=True, exist_ok=True)
        self.CACHE_DIR.mkdir(parents=True, exist_ok=True)
        Path(self.ARTIFACT_STORAGE_DIR).mkdir(parents=True, exist_ok=True)

settings = Settings()
settings.init_dirs()
