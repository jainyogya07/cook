"""
Tests for Palak's Real-time Event, Inference, and Streaming Routes.
"""
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "live_stream" in data


def test_api_status_endpoint():
    response = client.get("/api/v1/status")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ONLINE"
    assert "pipeline_version" in data


def test_api_telemetry_endpoint():
    response = client.get("/api/v1/telemetry?hour=24")
    assert response.status_code == 200
    data = response.json()
    assert data["requested_hour"] == 24
    assert "parameters" in data
    assert "wind_speed_ms" in data["parameters"]


def test_inference_anomaly_and_event_retrieval():
    payload = {
        "bbox": [80.0, 18.0, 88.0, 22.0],
        "forecast_hours": [0, 6, 12, 24],
        "variables": {
            "efi": 2.1,
            "precipitation_mm": 125.4
        },
        "hazard_hint": "extreme_precipitation"
    }
    # Submit inference job
    post_res = client.post("/api/v1/inference/anomaly", json=payload)
    assert post_res.status_code == 202
    job_data = post_res.json()
    assert "job_id" in job_data
    job_id = job_data["job_id"]

    # Check job status
    get_res = client.get(f"/api/v1/inference/jobs/{job_id}")
    assert get_res.status_code == 200
    job_info = get_res.json()
    assert job_info["job_id"] == job_id
    assert job_info["status"] in ("queued", "running", "completed")


def test_root_catalog_contains_realtime_stream_urls():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "realtime_streaming" in data
    assert "websocket" in data["realtime_streaming"]
    assert "sse" in data["realtime_streaming"]
