#!/usr/bin/env python3
"""
Entrypoint script for AI Weather Anomaly & Tracking Core.
Ministry of Earth Sciences (MoES) - Problem Statement 26078.
"""

import os
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent
WORKSPACE_DIR = ROOT_DIR.parent
VENV_DIR = ROOT_DIR / ".venv"
VENV_PYTHON = VENV_DIR / "bin" / "python3"

# 1. Seamless auto-activation: if .venv exists and user didn't activate it, re-exec inside .venv
if VENV_PYTHON.exists() and sys.prefix != str(VENV_DIR):
    env = dict(os.environ)
    env["VIRTUAL_ENV"] = str(VENV_DIR)
    env["PATH"] = f"{VENV_DIR / 'bin'}:{env.get('PATH', '')}"
    env["PYTHONPATH"] = f"{ROOT_DIR}:{WORKSPACE_DIR}:{env.get('PYTHONPATH', '')}"
    os.execve(str(VENV_PYTHON), [str(VENV_PYTHON)] + sys.argv, env)

# 2. Ensure ROOT_DIR and WORKSPACE_DIR are in sys.path
for p in (ROOT_DIR, WORKSPACE_DIR):
    p_str = str(p)
    if p_str not in sys.path:
        sys.path.insert(0, p_str)

current_pythonpath = os.environ.get("PYTHONPATH", "")
os.environ["PYTHONPATH"] = f"{ROOT_DIR}:{WORKSPACE_DIR}:{current_pythonpath}".strip(":")

if __name__ == "__main__":
    import uvicorn
    workers = int(os.environ.get("WORKERS", "1"))
    reload = os.environ.get("RELOAD", "True").lower() in ("true", "1")
    if workers > 1:
        reload = False
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=reload, workers=workers)
