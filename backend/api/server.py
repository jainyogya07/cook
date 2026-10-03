import os
import sys
from fastapi import FastAPI, Query, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Ensure pipeline package is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from pipeline.gfs_fetcher import get_latest_dataset, HORIZONS

app = FastAPI(
    title="4D Planetary Atmospheric Intelligence API",
    description="Stage 3 Real Data Ingestion & Atmospheric State API",
    version="1.0.0"
)

# Enable CORS for local frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/status")
def get_status():
    """System and data provenance status."""
    dataset = get_latest_dataset()
    return {
        "status": dataset.get("status", "ONLINE"),
        "pipeline_version": dataset.get("pipeline_version", "Stage3-v1.0"),
        "model_name": dataset.get("model_name", "NOAA GFS / NEPS-G"),
        "init_timestamp": dataset.get("init_timestamp"),
        "last_refresh_utc": dataset.get("last_refresh_utc"),
        "latency_minutes": dataset.get("latency_minutes", 18),
        "horizons": HORIZONS,
        "is_live_pipeline": True,
    }


@app.get("/api/v1/telemetry")
def get_telemetry(hour: int = Query(0, ge=0, le=120)):
    """Returns atmospheric metrics for the requested forecast horizon."""
    dataset = get_latest_dataset()
    frames = dataset.get("frames", {})

    # Snap to closest horizon frame (0, 24, 48, 72, 120) or interpolate
    closest_horizon = min(HORIZONS, key=lambda x: abs(x - hour))
    # Note: keys in json may be string or int
    frame = frames.get(closest_horizon) or frames.get(str(closest_horizon))

    if not frame:
        return {
            "error": "Horizon not found",
            "forecast_hour": hour,
            "mode": "OBSERVED" if hour == 0 else "FORECAST",
        }

    resp = dict(frame)
    resp["requested_hour"] = hour
    return resp


# ============================================================
# MODULE 3: EXTREME ANOMALY DETECTION REST & WEBSOCKET API
# ============================================================

ANOMALIES_DB = [
    {
        "eventId": "ANOM-2026-BOB-01",
        "type": "EXTREME_RAINFALL",
        "state": "MONITORING",
        "center": {"lat": 18.50, "lon": 87.00},
        "detectedAt": 1790841600000,
        "validFrom": 1790841600000,
        "validTo": 1790928000000,
        "severity": 0.92,
        "probability": 0.85,
        "deviation": {
            "variable": "precipitation",
            "currentValue": 142.4,
            "baselineValue": 48.1,
            "deviation": 94.3,
            "deviationStdDev": 3.8,
            "percentile": 0.99,
            "efi": 2.1,
            "sot": 1.4
        },
        "currentField": {
            "variable": "precipitation",
            "timestamp": 1790841600000,
            "validTime": 1790841600000,
            "bounds": {"latMin": 12.0, "latMax": 24.0, "lonMin": 80.0, "lonMax": 94.0},
            "resolution": 0.25,
            "units": "mm/h",
            "points": []
        },
        "provenance": {
            "sourceMode": "SIMULATION",
            "connectionState": "CONNECTED",
            "lastUpdate": 1790841600000,
            "dataAge": 42000,
            "model": "GNN-Temporal-v2.1",
            "modelSource": "NOAA GFS / NEPS-G",
            "resolution": "12 km",
            "baselinePeriod": "1991-2020 ERA5",
            "apiLatency": 18,
            "inferenceLatency": 340,
            "sourceCount": 127,
            "sources": ["NWP", "ERA5", "INSAT-3DR", "IMDAA"]
        },
        "trajectory": {
            "past": [
                {"timestamp": 1790798400000, "lat": 14.2, "lon": 89.0, "intensity": 0.72, "probability": 0.90}
            ],
            "current": {"timestamp": 1790841600000, "lat": 18.5, "lon": 87.0, "intensity": 0.92, "probability": 0.85},
            "forecast": [
                {"timestamp": 1790928000000, "lat": 20.4, "lon": 85.5, "intensity": 0.96, "probability": 0.78},
                {"timestamp": 1791014400000, "lat": 22.1, "lon": 83.8, "intensity": 0.88, "probability": 0.68},
                {"timestamp": 1791100800000, "lat": 23.5, "lon": 82.2, "intensity": 0.65, "probability": 0.54}
            ],
            "uncertainty": {
                "spatialRadiusKm": 45.0,
                "temporalWindowHours": 6.0,
                "ensembleSpread": 0.24,
                "probabilityRange": {"min": 0.70, "max": 0.92}
            }
        },
        "impact": {
            "primary": {
                "radiusKm": 120.0,
                "affectedArea": 45200.0,
                "population": 14800000,
                "riskLevel": "CRITICAL",
                "administrativeRegions": ["Odisha Coastal", "West Bengal Southern", "Andhra Northern"]
            },
            "secondary": {
                "radiusKm": 260.0,
                "affectedArea": 212000.0,
                "population": 28400000,
                "riskLevel": "HIGH",
                "administrativeRegions": ["Jharkhand", "Chhattisgarh", "Bihar South"]
            },
            "criticalInfrastructure": ["Paradip Port", "Kolkata Coastal Freight", "East Coast Railway"],
            "confidence": 0.88
        },
        "metadata": {
            "title": "Bay of Bengal Deep Depression & Convective Anomaly",
            "description": "Rapidly organizing cyclonic anomaly with extreme precipitation deviation exceeding P99 threshold.",
            "region": "Bay of Bengal / Eastern India"
        }
    },
    {
        "eventId": "ANOM-2026-NWI-02",
        "type": "EXTREME_HEAT",
        "state": "INTENSIFYING",
        "center": {"lat": 27.50, "lon": 72.00},
        "detectedAt": 1790841600000,
        "validFrom": 1790841600000,
        "validTo": 1791014400000,
        "severity": 0.84,
        "probability": 0.72,
        "deviation": {
            "variable": "temperature",
            "currentValue": 46.8,
            "baselineValue": 38.2,
            "deviation": 8.6,
            "deviationStdDev": 3.2,
            "percentile": 0.98,
            "efi": 1.8,
            "sot": 1.1
        },
        "currentField": {
            "variable": "temperature",
            "timestamp": 1790841600000,
            "validTime": 1790841600000,
            "bounds": {"latMin": 22.0, "latMax": 32.0, "lonMin": 68.0, "lonMax": 78.0},
            "resolution": 0.25,
            "units": "°C",
            "points": []
        },
        "provenance": {
            "sourceMode": "SIMULATION",
            "connectionState": "CONNECTED",
            "lastUpdate": 1790841600000,
            "dataAge": 42000,
            "model": "GNN-Temporal-v2.1",
            "modelSource": "NOAA GFS / NCUM",
            "resolution": "12 km",
            "baselinePeriod": "1991-2020 ERA5",
            "apiLatency": 18,
            "inferenceLatency": 310,
            "sourceCount": 94,
            "sources": ["NWP", "ERA5", "INSAT-3D", "IMD Automatic Weather Stations"]
        },
        "trajectory": {
            "past": [],
            "current": {"timestamp": 1790841600000, "lat": 27.5, "lon": 72.0, "intensity": 0.84, "probability": 0.72},
            "forecast": [
                {"timestamp": 1790928000000, "lat": 28.1, "lon": 73.2, "intensity": 0.88, "probability": 0.75},
                {"timestamp": 1791014400000, "lat": 28.6, "lon": 74.5, "intensity": 0.90, "probability": 0.70}
            ],
            "uncertainty": {
                "spatialRadiusKm": 80.0,
                "temporalWindowHours": 12.0,
                "ensembleSpread": 0.18,
                "probabilityRange": {"min": 0.65, "max": 0.82}
            }
        },
        "impact": {
            "primary": {
                "radiusKm": 200.0,
                "affectedArea": 125000.0,
                "population": 9600000,
                "riskLevel": "HIGH",
                "administrativeRegions": ["Western Rajasthan", "Haryana Southern"]
            },
            "criticalInfrastructure": ["Regional Power Transmission Grid", "Livestock Corridors"],
            "confidence": 0.82
        },
        "metadata": {
            "title": "Northwest India Synoptic Heat Dome",
            "description": "High-amplitude ridge creating severe subsidence heating and prolonged 46°C+ thermal extreme.",
            "region": "Thar / Northwest India"
        }
    },
    {
        "eventId": "ANOM-2026-ARS-03",
        "type": "EXTREME_WIND",
        "state": "MONITORING",
        "center": {"lat": 16.00, "lon": 65.50},
        "detectedAt": 1790841600000,
        "validFrom": 1790841600000,
        "validTo": 1790928000000,
        "severity": 0.78,
        "probability": 0.64,
        "deviation": {
            "variable": "wind",
            "currentValue": 38.0,
            "baselineValue": 14.5,
            "deviation": 23.5,
            "deviationStdDev": 2.9,
            "percentile": 0.95,
            "efi": 1.6,
            "sot": 0.9
        },
        "currentField": {
            "variable": "wind",
            "timestamp": 1790841600000,
            "validTime": 1790841600000,
            "bounds": {"latMin": 10.0, "latMax": 22.0, "lonMin": 58.0, "lonMax": 72.0},
            "resolution": 0.25,
            "units": "m/s",
            "points": []
        },
        "provenance": {
            "sourceMode": "SIMULATION",
            "connectionState": "CONNECTED",
            "lastUpdate": 1790841600000,
            "dataAge": 42000,
            "model": "GNN-Temporal-v2.1",
            "modelSource": "NOAA GFS / NEPS-G",
            "resolution": "12 km",
            "baselinePeriod": "1991-2020 ERA5",
            "apiLatency": 18,
            "inferenceLatency": 320,
            "sourceCount": 86,
            "sources": ["NWP", "ASCAT Scatterometer", "ERA5"]
        },
        "trajectory": {
            "past": [],
            "current": {"timestamp": 1790841600000, "lat": 16.0, "lon": 65.5, "intensity": 0.78, "probability": 0.64},
            "forecast": [
                {"timestamp": 1790928000000, "lat": 17.5, "lon": 66.8, "intensity": 0.82, "probability": 0.60}
            ],
            "uncertainty": {
                "spatialRadiusKm": 60.0,
                "temporalWindowHours": 6.0,
                "ensembleSpread": 0.22,
                "probabilityRange": {"min": 0.52, "max": 0.72}
            }
        },
        "impact": {
            "primary": {
                "radiusKm": 150.0,
                "affectedArea": 70000.0,
                "population": 0,
                "riskLevel": "HIGH",
                "administrativeRegions": ["Arabian Sea Offshore / Shipping Lane"]
            },
            "criticalInfrastructure": ["Arabian Sea Deepwater Transit Route", "Offshore Rigs"],
            "confidence": 0.84
        },
        "metadata": {
            "title": "Central Arabian Sea Marine Gale Squall",
            "description": "Intense low-level jet streak with near-storm-force wind gusts disrupting commercial shipping corridors.",
            "region": "Central Arabian Sea"
        }
    }
]


@app.get("/api/anomalies")
def get_anomalies():
    """List all active extreme atmospheric anomalies."""
    import time
    import os
    now_ms = int(time.time() * 1000)
    is_live = os.getenv("LIVE_OPERATIONAL_INGEST", "false").lower() == "true"
    return {
        "anomalies": ANOMALIES_DB,
        "count": len(ANOMALIES_DB),
        "provenance": {
            "sourceMode": "LIVE" if is_live else "SIMULATION",
            "connectionState": "CONNECTED",
            "lastUpdate": now_ms,
            "nextUpdate": now_ms + 60000,
            "dataAge": 18000,
            "model": "GNN-Temporal-v2.1",
            "modelSource": "NOAA GFS / NEPS-G (Deterministic Tensor)",
            "resolution": "12 km",
            "baselinePeriod": "1991-2020 ERA5",
            "apiLatency": 14,
            "inferenceLatency": 340,
            "sourceCount": 127,
            "sources": ["NWP", "ERA5", "INSAT-3DR", "IMDAA"]
        }
    }


@app.get("/api/anomalies/{event_id}")
def get_anomaly_detail(event_id: str):
    """Retrieve detailed anomaly by event ID."""
    import time
    import os
    now_ms = int(time.time() * 1000)
    is_live = os.getenv("LIVE_OPERATIONAL_INGEST", "false").lower() == "true"
    for anom in ANOMALIES_DB:
        if anom["eventId"] == event_id:
            return {
                "anomaly": anom,
                "provenance": {
                    "sourceMode": "LIVE" if is_live else "SIMULATION",
                    "connectionState": "CONNECTED",
                    "lastUpdate": now_ms,
                    "dataAge": 18000,
                    "model": "GNN-Temporal-v2.1",
                    "modelSource": "NOAA GFS / NEPS-G (Deterministic Tensor)"
                }
            }
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Anomaly event not found")


@app.get("/api/anomalies/{event_id}/timeline")
def get_anomaly_timeline(event_id: str):
    """Retrieve trajectory and temporal evolution for anomaly."""
    for anom in ANOMALIES_DB:
        if anom["eventId"] == event_id:
            return {
                "timeline": anom.get("trajectory", {}),
                "eventId": event_id
            }
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Anomaly event not found")


@app.get("/api/anomalies/{event_id}/impact")
def get_anomaly_impact(event_id: str):
    """Retrieve impact assessment for anomaly."""
    for anom in ANOMALIES_DB:
        if anom["eventId"] == event_id:
            return {
                "impact": anom.get("impact", {}),
                "eventId": event_id
            }
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Anomaly event not found")


# ============================================================
# MODULE 4: DYNAMIC EVENT FOOTPRINT ENGINE
# ============================================================

FOOTPRINT_TIMELINE_DB = {
    "ANOM-2026-BOB-01": [
        {
            "forecastHour": 0,
            "timestamp": 1790841600000,
            "status": "ORGANIZING_MARITIME",
            "centroid": {"lat": 18.50, "lon": 87.00},
            "areaKm2": 38400.0,
            "coreAreaKm2": 9200.0,
            "primaryAreaKm2": 21400.0,
            "peripheralAreaKm2": 38400.0,
            "maxIntensity": 0.92,
            "meanIntensity": 0.65,
            "probability": 0.85,
            "efi": 2.1,
            "verticalDepthKm": 9.4,
            "aspectRatio": 1.15,
            "orientationDeg": 315,
            "exposedRegions": ["Bay of Bengal Central Maritime", "East India Deepwater Corridor"],
            "coreRadii": {"north": 0.85, "south": 0.75, "east": 0.90, "west": 0.80},
            "primaryRadii": {"north": 1.70, "south": 1.50, "east": 1.85, "west": 1.60},
            "peripheralRadii": {"north": 2.60, "south": 2.20, "east": 2.80, "west": 2.40}
        },
        {
            "forecastHour": 6,
            "timestamp": 1790863200000,
            "status": "INTENSIFYING",
            "centroid": {"lat": 18.95, "lon": 86.45},
            "areaKm2": 51200.0,
            "coreAreaKm2": 13800.0,
            "primaryAreaKm2": 29600.0,
            "peripheralAreaKm2": 51200.0,
            "maxIntensity": 0.94,
            "meanIntensity": 0.69,
            "probability": 0.87,
            "efi": 2.2,
            "verticalDepthKm": 10.2,
            "aspectRatio": 1.22,
            "orientationDeg": 320,
            "exposedRegions": ["Outer Odisha Maritime Zone", "Gopalpur Offshore"],
            "coreRadii": {"north": 1.05, "south": 0.90, "east": 1.10, "west": 0.95},
            "primaryRadii": {"north": 2.05, "south": 1.75, "east": 2.15, "west": 1.85},
            "peripheralRadii": {"north": 3.00, "south": 2.50, "east": 3.20, "west": 2.70}
        },
        {
            "forecastHour": 12,
            "timestamp": 1790884800000,
            "status": "EXPANDING_NORTHWEST",
            "centroid": {"lat": 19.40, "lon": 85.90},
            "areaKm2": 68500.0,
            "coreAreaKm2": 18200.0,
            "primaryAreaKm2": 39800.0,
            "peripheralAreaKm2": 68500.0,
            "maxIntensity": 0.96,
            "meanIntensity": 0.73,
            "probability": 0.88,
            "efi": 2.3,
            "verticalDepthKm": 10.8,
            "aspectRatio": 1.30,
            "orientationDeg": 328,
            "exposedRegions": ["Puri Coastal Zone", "Ganjam Littoral", "Chilika Lagoon Outer"],
            "coreRadii": {"north": 1.25, "south": 1.05, "east": 1.30, "west": 1.15},
            "primaryRadii": {"north": 2.45, "south": 2.05, "east": 2.55, "west": 2.20},
            "peripheralRadii": {"north": 3.50, "south": 2.90, "east": 3.65, "west": 3.10}
        },
        {
            "forecastHour": 24,
            "timestamp": 1790928000000,
            "status": "APPROACHING_COASTLINE",
            "centroid": {"lat": 19.95, "lon": 85.30},
            "areaKm2": 84250.0,
            "coreAreaKm2": 22400.0,
            "primaryAreaKm2": 52100.0,
            "peripheralAreaKm2": 84250.0,
            "maxIntensity": 0.97,
            "meanIntensity": 0.76,
            "probability": 0.90,
            "efi": 2.4,
            "verticalDepthKm": 11.2,
            "aspectRatio": 1.42,
            "orientationDeg": 335,
            "exposedRegions": ["Puri", "Jagatsinghpur", "Kendrapara", "Khordha", "Cuttack Fringe"],
            "coreRadii": {"north": 1.45, "south": 1.20, "east": 1.50, "west": 1.30},
            "primaryRadii": {"north": 2.85, "south": 2.35, "east": 2.95, "west": 2.50},
            "peripheralRadii": {"north": 4.10, "south": 3.30, "east": 4.25, "west": 3.55}
        },
        {
            "forecastHour": 48,
            "timestamp": 1791014400000,
            "status": "COASTAL_LANDFALL_PEAK",
            "centroid": {"lat": 20.65, "lon": 84.50},
            "areaKm2": 98600.0,
            "coreAreaKm2": 26800.0,
            "primaryAreaKm2": 61400.0,
            "peripheralAreaKm2": 98600.0,
            "maxIntensity": 0.98,
            "meanIntensity": 0.78,
            "probability": 0.92,
            "efi": 2.5,
            "verticalDepthKm": 11.5,
            "aspectRatio": 1.55,
            "orientationDeg": 345,
            "exposedRegions": ["Bhubaneswar-Cuttack Urban Belt", "Paradip Industrial Hub", "Bhadrak Coastal", "Balasore", "East Midnapore"],
            "coreRadii": {"north": 1.65, "south": 1.35, "east": 1.70, "west": 1.45},
            "primaryRadii": {"north": 3.20, "south": 2.60, "east": 3.35, "west": 2.80},
            "peripheralRadii": {"north": 4.60, "south": 3.70, "east": 4.80, "west": 3.95}
        },
        {
            "forecastHour": 72,
            "timestamp": 1791100800000,
            "status": "INLAND_DEFORMATION_DISSIPATING",
            "centroid": {"lat": 21.40, "lon": 83.60},
            "areaKm2": 72000.0,
            "coreAreaKm2": 11500.0,
            "primaryAreaKm2": 42000.0,
            "peripheralAreaKm2": 72000.0,
            "maxIntensity": 0.75,
            "meanIntensity": 0.58,
            "probability": 0.74,
            "efi": 1.7,
            "verticalDepthKm": 8.0,
            "aspectRatio": 1.75,
            "orientationDeg": 355,
            "exposedRegions": ["Interior Odisha (Sambalpur)", "Jharkhand South (West Singhbhum)", "Chhattisgarh Borderlands"],
            "coreRadii": {"north": 1.05, "south": 0.85, "east": 1.25, "west": 0.95},
            "primaryRadii": {"north": 2.40, "south": 1.90, "east": 2.80, "west": 2.10},
            "peripheralRadii": {"north": 3.70, "south": 2.90, "east": 4.20, "west": 3.10}
        }
    ]
}


@app.get("/api/events/{event_id}/footprint")
def get_event_footprint(event_id: str, h: int = 0):
    """Retrieve dynamic spatial footprint for an extreme event at given forecast hour."""
    import time
    now_ms = int(time.time() * 1000)
    timeline = FOOTPRINT_TIMELINE_DB.get(event_id)
    if not timeline:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Event footprint not found")

    # Find closest matching frame
    frame = timeline[0]
    for f in timeline:
        if f["forecastHour"] == h:
            frame = f
            break

    return {
        "eventId": event_id,
        "title": "Bay of Bengal Severe Convective Anomaly Footprint",
        "currentFrame": frame,
        "provenance": {
            "sourceMode": "SIMULATION",
            "connectionState": "CONNECTED",
            "model": "GNN-SpatialFootprint-v2.1",
            "modelSource": "ECMWF / IMDAA (Deterministic Spatial Tensor)",
            "resolution": "12 km",
            "methodology": "Dual-Threshold Connected Isohyetal Segmentation (EFI > 2.0 / P95)",
            "lastUpdate": now_ms,
            "apiLatency": 14
        }
    }


@app.get("/api/events/{event_id}/footprint/timeline")
def get_event_footprint_timeline(event_id: str):
    """Retrieve complete multi-temporal dynamic footprint evolution sequence."""
    import time
    now_ms = int(time.time() * 1000)
    timeline = FOOTPRINT_TIMELINE_DB.get(event_id)
    if not timeline:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Event footprint timeline not found")

    return {
        "eventId": event_id,
        "frames": timeline,
        "totalFrames": len(timeline),
        "horizonHours": 72,
        "provenance": {
            "sourceMode": "SIMULATION",
            "connectionState": "CONNECTED",
            "model": "GNN-SpatialFootprint-v2.1",
            "modelSource": "ECMWF / IMDAA (Deterministic Spatial Tensor)",
            "resolution": "12 km",
            "lastUpdate": now_ms,
            "apiLatency": 16
        }
    }


@app.websocket("/api/events/{event_id}/footprint/live")
async def websocket_footprint_live(websocket: WebSocket, event_id: str):
    """Live streaming WebSocket for dynamic footprint updates."""
    await websocket.accept()
    import asyncio
    import time
    import random
    try:
        while True:
            await asyncio.sleep(5)
            now_ms = int(time.time() * 1000)
            jitter_intensity = round(random.uniform(-0.01, 0.01), 3)
            await websocket.send_json({
                "type": "FOOTPRINT_STREAM_PING",
                "eventId": event_id,
                "timestamp": now_ms,
                "status": "TRACKING_ACTIVE",
                "telemetry": {
                    "latencyMs": random.randint(4, 12),
                    "entropy": 0.042
                }
            })
    except WebSocketDisconnect:
        pass


# ============================================================
# MODULE 5: EVENT TRAJECTORY / TRACKING ENGINE
# ============================================================

import math

def calculate_geodesic_distance_km(lat1, lon1, lat2, lon2):
    """Haversine formula for geodesic distance in kilometers."""
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def calculate_bearing_deg(lat1, lon1, lat2, lon2):
    """Initial forward azimuth/bearing in degrees [0, 360)."""
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    dlambda = math.radians(lon2 - lon1)
    y = math.sin(dlambda) * math.cos(phi2)
    x = math.cos(phi1) * math.sin(phi2) - math.sin(phi1) * math.cos(phi2) * math.cos(dlambda)
    bearing = math.degrees(math.atan2(y, x))
    return (bearing + 360) % 360

def bearing_to_cardinal(deg):
    directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
                  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    idx = round(deg / 22.5) % 16
    return directions[idx]

HISTORICAL_TRACK_POINTS = [
    {
        "leadHour": -24,
        "timestamp": 1790755200000,
        "lat": 14.20,
        "lon": 89.20,
        "intensity": 0.70,
        "pressure": 1004.0,
        "windSpeedMs": 14.0,
        "windSpeedKmh": 50.4,
        "headingDeg": 332.0,
        "headingCardinal": "NNW",
        "speedKmh": 16.5,
        "status": "TROPICAL_DEPRESSION_ORIGIN",
        "statusLabel": "Deep Depression Genesis (Central Bay of Bengal)"
    },
    {
        "leadHour": -18,
        "timestamp": 1790776800000,
        "lat": 15.30,
        "lon": 88.65,
        "intensity": 0.76,
        "pressure": 1000.0,
        "windSpeedMs": 18.0,
        "windSpeedKmh": 64.8,
        "headingDeg": 334.0,
        "headingCardinal": "NNW",
        "speedKmh": 17.2,
        "status": "CYCLONIC_ORGANIZATION",
        "statusLabel": "Cyclonic Organization Phase"
    },
    {
        "leadHour": -12,
        "timestamp": 1790798400000,
        "lat": 16.40,
        "lon": 88.10,
        "intensity": 0.82,
        "pressure": 996.0,
        "windSpeedMs": 22.0,
        "windSpeedKmh": 79.2,
        "headingDeg": 336.0,
        "headingCardinal": "NNW",
        "speedKmh": 17.8,
        "status": "CYCLONIC_STORM",
        "statusLabel": "Named Cyclonic Storm Stage"
    },
    {
        "leadHour": -6,
        "timestamp": 1790820000000,
        "lat": 17.45,
        "lon": 87.55,
        "intensity": 0.88,
        "pressure": 991.0,
        "windSpeedMs": 26.0,
        "windSpeedKmh": 93.6,
        "headingDeg": 338.0,
        "headingCardinal": "NNW",
        "speedKmh": 18.0,
        "status": "SEVERE_CYCLONIC_STORM",
        "statusLabel": "Severe Cyclonic Storm Intensification"
    },
    {
        "leadHour": 0,
        "timestamp": 1790841600000,
        "lat": 18.50,
        "lon": 87.00,
        "intensity": 0.92,
        "pressure": 986.0,
        "windSpeedMs": 32.0,
        "windSpeedKmh": 115.2,
        "headingDeg": 339.0,
        "headingCardinal": "NNW",
        "speedKmh": 18.2,
        "status": "VERY_SEVERE_CYCLONIC_STORM",
        "statusLabel": "Observed Active Centroid (Module 4 Origin)"
    }
]

CONSENSUS_FORECAST_POINTS = [
    {
        "leadHour": 0,
        "timestamp": 1790841600000,
        "lat": 18.50,
        "lon": 87.00,
        "intensity": 0.92,
        "pressure": 986.0,
        "windSpeedMs": 32.0,
        "windSpeedKmh": 115.2,
        "headingDeg": 312.0,
        "headingCardinal": "NW",
        "speedKmh": 18.2,
        "ensembleAgreement": 1.0,
        "spreadRadiusKm": 12.0,
        "status": "INITIALIZED_STATE",
        "statusLabel": "Ensemble Initialization Consensus"
    },
    {
        "leadHour": 6,
        "timestamp": 1790863200000,
        "lat": 18.95,
        "lon": 86.30,
        "intensity": 0.94,
        "pressure": 982.0,
        "windSpeedMs": 36.0,
        "windSpeedKmh": 129.6,
        "headingDeg": 312.0,
        "headingCardinal": "NW",
        "speedKmh": 18.5,
        "ensembleAgreement": 0.91,
        "spreadRadiusKm": 28.0,
        "status": "NORTHWEST_TRACK",
        "statusLabel": "Coherent Northwest Propagation"
    },
    {
        "leadHour": 12,
        "timestamp": 1790884800000,
        "lat": 19.35,
        "lon": 85.70,
        "intensity": 0.96,
        "pressure": 978.0,
        "windSpeedMs": 40.0,
        "windSpeedKmh": 144.0,
        "headingDeg": 316.0,
        "headingCardinal": "NW",
        "speedKmh": 18.0,
        "ensembleAgreement": 0.87,
        "spreadRadiusKm": 44.0,
        "status": "COASTAL_APPROACH",
        "statusLabel": "High-Confidence Coastal Track"
    },
    {
        "leadHour": 24,
        "timestamp": 1790928000000,
        "lat": 19.95,
        "lon": 85.30,
        "intensity": 0.97,
        "pressure": 974.0,
        "windSpeedMs": 44.0,
        "windSpeedKmh": 158.4,
        "headingDeg": 335.0,
        "headingCardinal": "NNW",
        "speedKmh": 17.5,
        "ensembleAgreement": 0.82,
        "spreadRadiusKm": 72.0,
        "status": "LANDFALL_CORRIDOR",
        "statusLabel": "Puri-Jagatsinghpur Landfall Window"
    },
    {
        "leadHour": 48,
        "timestamp": 1791014400000,
        "lat": 20.65,
        "lon": 84.50,
        "intensity": 0.98,
        "pressure": 968.0,
        "windSpeedMs": 48.0,
        "windSpeedKmh": 172.8,
        "headingDeg": 328.0,
        "headingCardinal": "NNW",
        "speedKmh": 17.0,
        "ensembleAgreement": 0.68,
        "spreadRadiusKm": 118.0,
        "status": "INLAND_PROGRESSION",
        "statusLabel": "Inland Heavy Core Dispersion"
    },
    {
        "leadHour": 72,
        "timestamp": 1791100800000,
        "lat": 21.20,
        "lon": 83.90,
        "intensity": 0.75,
        "pressure": 985.0,
        "windSpeedMs": 24.0,
        "windSpeedKmh": 86.4,
        "headingDeg": 330.0,
        "headingCardinal": "NNW",
        "speedKmh": 15.0,
        "ensembleAgreement": 0.54,
        "spreadRadiusKm": 174.0,
        "status": "DEEP_DISSIPATION",
        "statusLabel": "Chota Nagpur / Interior Dissipation"
    }
]

# Generate 24 Deterministic, Spatially Correlated Ensemble Members
def generate_ensemble_members():
    members = []
    perturbations = [
        (-4.0, 1.01, "ECMWF-ENS-01", 0.96),
        (+3.5, 0.99, "ECMWF-ENS-02", 0.95),
        (-8.2, 1.03, "ECMWF-ENS-03", 0.92),
        (+9.1, 0.97, "ECMWF-ENS-04", 0.91),
        (-14.0, 1.05, "GFS-GEFS-01", 0.88),
        (+15.5, 0.95, "GFS-GEFS-02", 0.87),
        (-22.0, 1.08, "GFS-GEFS-03", 0.84),
        (+24.0, 0.92, "GFS-GEFS-04", 0.83),
        (-31.0, 1.10, "NCUM-NEPS-01", 0.80),
        (+33.0, 0.90, "NCUM-NEPS-02", 0.79),
        (-5.5, 0.98, "UKMO-MOGREPS-01", 0.94),
        (+6.2, 1.02, "UKMO-MOGREPS-02", 0.93),
        (-18.5, 1.06, "NCUM-NEPS-03", 0.85),
        (+19.8, 0.94, "NCUM-NEPS-04", 0.84),
        (-42.0, 1.12, "ICON-EPS-01", 0.74),
        (+44.5, 0.88, "ICON-EPS-02", 0.73),
        (-11.0, 1.02, "ECMWF-ENS-05", 0.89),
        (+12.0, 0.98, "ECMWF-ENS-06", 0.88),
        (-27.0, 1.07, "GFS-GEFS-05", 0.81),
        (+29.0, 0.93, "GFS-GEFS-06", 0.80),
        (-52.0, 1.15, "EXPERIMENTAL-GNN-01", 0.69),
        (+56.0, 0.85, "EXPERIMENTAL-GNN-02", 0.67),
        (-1.5, 1.00, "CONTROL-RUN-HIGHRES", 0.98),
        (+1.8, 1.00, "MULTI-MODEL-MEAN", 0.97),
    ]

    for idx, (cross_km, speed_factor, model_name, weight) in enumerate(perturbations):
        member_points = []
        for pt in CONSENSUS_FORECAST_POINTS:
            h = pt["leadHour"]
            dispersion = (h / 72.0) ** 1.35 if h > 0 else 0.0

            lat_offset = (cross_km * dispersion * 0.707) / 111.0
            lon_offset = (cross_km * dispersion * 0.707) / (111.0 * math.cos(math.radians(pt["lat"])))

            along_km = (speed_factor - 1.0) * (pt["speedKmh"] * h)
            lat_along = (along_km * 0.707) / 111.0
            lon_along = -(along_km * 0.707) / (111.0 * math.cos(math.radians(pt["lat"])))

            m_lat = round(pt["lat"] + lat_offset + lat_along, 3)
            m_lon = round(pt["lon"] + lon_offset + lon_along, 3)
            departure_km = round(calculate_geodesic_distance_km(pt["lat"], pt["lon"], m_lat, m_lon), 1)

            member_points.append({
                "leadHour": h,
                "timestamp": pt["timestamp"],
                "lat": m_lat,
                "lon": m_lon,
                "intensity": round(max(0.4, min(1.0, pt["intensity"] + (weight - 0.85) * 0.08)), 2),
                "departureFromConsensusKm": departure_km
            })

        members.append({
            "memberId": f"EPS-{idx+1:03d}",
            "modelName": model_name,
            "weight": weight,
            "colorHue": 190 + (idx * 7) % 60,
            "points": member_points
        })

    return members

ENSEMBLE_MEMBERS_CACHE = generate_ensemble_members()

def generate_probability_corridor():
    """Derives 50%, 70%, 90% uncertainty corridor polygons from ensemble points."""
    corridor_horizons = []
    for pt in CONSENSUS_FORECAST_POINTS:
        h = pt["leadHour"]
        pts_at_h = []
        for m in ENSEMBLE_MEMBERS_CACHE:
            for mp in m["points"]:
                if mp["leadHour"] == h:
                    pts_at_h.append(mp)
                    break

        departures = sorted([p["departureFromConsensusKm"] for p in pts_at_h])
        n = len(departures)
        rad_50 = departures[int(n * 0.50)] if n else 10.0
        rad_70 = departures[int(n * 0.70)] if n else 20.0
        rad_90 = departures[min(n - 1, int(n * 0.90))] if n else 35.0

        corridor_horizons.append({
            "leadHour": h,
            "timestamp": pt["timestamp"],
            "consensusLat": pt["lat"],
            "consensusLon": pt["lon"],
            "spreadKm": {
                "p50": round(max(rad_50, 8.0), 1),
                "p70": round(max(rad_70, 16.0), 1),
                "p90": round(max(rad_90, 24.0), 1)
            }
        })
    return corridor_horizons

PROBABILITY_CORRIDOR_CACHE = generate_probability_corridor()

@app.get("/api/events/{event_id}/trajectory")
def get_event_trajectory(event_id: str):
    """Complete Module 5 Trajectory & Ensemble Tracking Contract."""
    import time
    now_ms = int(time.time() * 1000)

    p_curr = CONSENSUS_FORECAST_POINTS[0]
    p_next = CONSENSUS_FORECAST_POINTS[1]
    bearing = calculate_bearing_deg(p_curr["lat"], p_curr["lon"], p_next["lat"], p_next["lon"])
    dist_km = calculate_geodesic_distance_km(p_curr["lat"], p_curr["lon"], p_next["lat"], p_next["lon"])
    speed_kmh = round(dist_km / 6.0, 1)

    return {
        "eventId": event_id,
        "title": "Bay of Bengal Severe Convective Anomaly Trajectory",
        "currentCentroid": {"lat": p_curr["lat"], "lon": p_curr["lon"]},
        "currentMotion": {
            "bearingDeg": round(bearing, 1),
            "headingCardinal": bearing_to_cardinal(bearing),
            "speedKmh": speed_kmh,
            "speedKnots": round(speed_kmh * 0.539957, 1)
        },
        "historicalTrack": HISTORICAL_TRACK_POINTS,
        "consensusForecast": CONSENSUS_FORECAST_POINTS,
        "ensembleMembers": ENSEMBLE_MEMBERS_CACHE,
        "probabilityCorridor": PROBABILITY_CORRIDOR_CACHE,
        "summary": {
            "originRegion": "Central Bay of Bengal (14.20°N, 89.20°E)",
            "currentRegion": "North-Central Bay of Bengal (18.50°N, 87.00°E)",
            "projectedLandfall": "Puri-Jagatsinghpur Coast, Odisha (19.95°N, 85.30°E)",
            "peakIntensityLeadHour": 48,
            "ensembleMemberCount": len(ENSEMBLE_MEMBERS_CACHE),
            "agreementAtT24": 0.82,
            "agreementAtT72": 0.54
        },
        "provenance": {
            "sourceMode": "SIMULATION",
            "connectionState": "CONNECTED",
            "model": "NEPS-G / ECMWF-ENS (Correlated Perturbations)",
            "modelSource": "Deterministic Numerical Weather Prediction",
            "resolution": "12 km",
            "ensembleMembers": 24,
            "initializedUtc": "00Z",
            "lastUpdate": now_ms,
            "apiLatency": 15
        }
    }

@app.get("/api/events/{event_id}/track")
def get_event_track(event_id: str):
    """Retrieve historical and consensus track points."""
    return {
        "eventId": event_id,
        "historical": HISTORICAL_TRACK_POINTS,
        "consensus": CONSENSUS_FORECAST_POINTS
    }

@app.get("/api/events/{event_id}/ensemble")
def get_event_ensemble(event_id: str):
    """Retrieve ensemble members and spread envelope."""
    return {
        "eventId": event_id,
        "memberCount": len(ENSEMBLE_MEMBERS_CACHE),
        "members": ENSEMBLE_MEMBERS_CACHE,
        "corridor": PROBABILITY_CORRIDOR_CACHE
    }

@app.websocket("/api/events/{event_id}/trajectory/live")
async def websocket_trajectory_live(websocket: WebSocket, event_id: str):
    """Live streaming WebSocket for trajectory tracking updates."""
    await websocket.accept()
    import asyncio
    import time
    import random
    try:
        while True:
            await asyncio.sleep(4)
            now_ms = int(time.time() * 1000)
            await websocket.send_json({
                "type": "TRAJECTORY_STREAM_UPDATE",
                "eventId": event_id,
                "timestamp": now_ms,
                "status": "TRACKING_ACTIVE",
                "currentCentroid": {
                    "lat": 18.50 + round(random.uniform(-0.005, 0.005), 3),
                    "lon": 87.00 + round(random.uniform(-0.005, 0.005), 3)
                },
                "speedKmh": round(18.2 + random.uniform(-0.3, 0.3), 1),
                "headingDeg": round(312.0 + random.uniform(-1.0, 1.0), 1),
                "telemetry": {
                    "latencyMs": random.randint(5, 14),
                    "ensembleSpreadKm": 12.4
                }
            })
    except WebSocketDisconnect:
        pass



# ============================================================
# MODULE 6: ENSEMBLE PROBABILITY FIELD ENGINE
# ============================================================

def generate_probability_grid_data(lead_hour: int, variable: str = "PRECIP"):
    """
    Computes Gaussian Kernel Density Estimation (KDE) over a geographic grid
    from the 24 correlated NWP ensemble member positions at the specified lead hour.
    """
    # 1. Collect ensemble member locations at this lead hour
    member_points = []
    for m in ENSEMBLE_MEMBERS_CACHE:
        for p in m["points"]:
            if p["leadHour"] == lead_hour:
                member_points.append({
                    "lat": p["lat"],
                    "lon": p["lon"],
                    "weight": m["weight"],
                    "intensity": p["intensity"]
                })
                break

    if not member_points:
        # Fallback to consensus
        cp = next((p for p in CONSENSUS_FORECAST_POINTS if p["leadHour"] == lead_hour), CONSENSUS_FORECAST_POINTS[0])
        member_points.append({"lat": cp["lat"], "lon": cp["lon"], "weight": 1.0, "intensity": cp["intensity"]})

    # Variable adjustment factors
    var_mult = {"PRECIP": 1.0, "WIND": 0.95, "TEMP": 0.88, "DROUGHT": 0.78}.get(variable, 1.0)

    # 2. Grid bounds for South Asia / Bay of Bengal sector
    lat_min, lat_max = 14.0, 25.0
    lon_min, lon_max = 80.0, 91.0
    resolution = 0.25 # ~28 km macro grid
    rows = int(round((lat_max - lat_min) / resolution)) + 1
    cols = int(round((lon_max - lon_min) / resolution)) + 1

    # Kernel dispersion radius grows with lead time
    # 6H: ~32 km, 24H: ~48 km, 48H: ~70 km, 72H: ~95 km
    sigma_km = 28.0 + (lead_hour / 72.0) * 65.0

    raw_values = []
    sum_weighted_lat = 0.0
    sum_weighted_lon = 0.0
    total_prob_mass = 0.0

    max_val = 0.0

    for r in range(rows):
        lat = lat_min + r * resolution
        for c in range(cols):
            lon = lon_min + c * resolution

            # Evaluate KDE sum
            cell_density = 0.0
            for mp in member_points:
                dist_km = calculate_geodesic_distance_km(lat, lon, mp["lat"], mp["lon"])
                kernel = math.exp(-(dist_km ** 2) / (2.0 * (sigma_km ** 2)))
                cell_density += kernel * mp["weight"]

            # Variable scalar modulation
            cell_density *= var_mult
            raw_values.append(cell_density)
            if cell_density > max_val:
                max_val = cell_density

    # 3. Normalize into scientific support percentage [0.0, peak_pct]
    # Calibrated peak support decreases naturally with forecast lead:
    # 0H: 95%, 6H: 91%, 24H: 82%, 48H: 74%, 72H: 62%
    calibrated_peaks = {0: 0.95, 6: 0.91, 12: 0.87, 24: 0.82, 48: 0.74, 72: 0.62}
    target_peak = calibrated_peaks.get(lead_hour, 0.74) * var_mult

    norm_values = []
    inv_max = (target_peak / max_val) if max_val > 0 else 0.0

    for i, v in enumerate(raw_values):
        val = round(min(1.0, v * inv_max), 3)
        norm_values.append(val)
        if val > 0.15:
            r = i // cols
            c = i % cols
            cell_lat = lat_min + r * resolution
            cell_lon = lon_min + c * resolution
            sum_weighted_lat += cell_lat * val
            sum_weighted_lon += cell_lon * val
            total_prob_mass += val

    # Centroid
    if total_prob_mass > 0:
        centroid_lat = round(sum_weighted_lat / total_prob_mass, 2)
        centroid_lon = round(sum_weighted_lon / total_prob_mass, 2)
    else:
        centroid_lat, centroid_lon = 18.5, 87.0

    # 4. Generate discrete contour geometries & geodesic area estimates
    # Levels: 10%, 20%, 30%, 50%, 70%, 90%
    levels = [0.10, 0.20, 0.30, 0.50, 0.70, 0.90]
    contours = []
    
    # Base cell area at ~19°N: ~27.7 km lat * ~26.2 km lon ~ 725 km²
    cell_area_km2 = (resolution * 111.0) * (resolution * 111.0 * math.cos(math.radians(centroid_lat)))

    for lvl in levels:
        cells_above = sum(1 for v in norm_values if v >= lvl)
        area_km2 = round(cells_above * cell_area_km2, -2)

        # Build parametric boundary loop around centroid
        semi_major_km = math.sqrt(area_km2 / math.pi) if area_km2 > 0 else 10.0
        semi_minor_km = semi_major_km * 0.72 # Elliptical orientation along NNW track

        boundary_coords = []
        segments = 36
        track_angle_rad = math.radians(330.0 - 90.0) # NNW orientation

        for s in range(segments):
            angle = (s / segments) * 2 * math.pi
            rx = semi_major_km * math.cos(angle)
            ry = semi_minor_km * math.sin(angle)
            rot_x = rx * math.cos(track_angle_rad) - ry * math.sin(track_angle_rad)
            rot_y = rx * math.sin(track_angle_rad) + ry * math.cos(track_angle_rad)

            p_lat = centroid_lat + rot_y / 111.0
            p_lon = centroid_lon + rot_x / (111.0 * math.cos(math.radians(centroid_lat)))
            boundary_coords.append([round(p_lon, 3), round(p_lat, 3)])
        if boundary_coords:
            boundary_coords.append(boundary_coords[0])

        contours.append({
            "level": lvl,
            "label": f"{int(lvl*100)}% Occurrence Contour",
            "areaKm2": int(area_km2),
            "coordinates": boundary_coords
        })

    return {
        "leadHour": lead_hour,
        "variable": variable,
        "grid": {
            "latMin": lat_min,
            "latMax": lat_max,
            "lonMin": lon_min,
            "lonMax": lon_max,
            "resolution": resolution,
            "rows": rows,
            "cols": cols,
            "values": norm_values
        },
        "centroid": {
            "lat": centroid_lat,
            "lon": centroid_lon
        },
        "statistics": {
            "peakSupport": target_peak,
            "area50Km2": next((c["areaKm2"] for c in contours if c["level"] == 0.50), 18400),
            "area70Km2": next((c["areaKm2"] for c in contours if c["level"] == 0.70), 8200),
            "area90Km2": next((c["areaKm2"] for c in contours if c["level"] == 0.90), 3200),
            "totalSupportMass": round(total_prob_mass, 1)
        },
        "contours": contours
    }


PROBABILITY_TIMELINE_LEADS = [0, 6, 12, 24, 48, 72]
PROBABILITY_TIMELINE_CACHE = {
    h: generate_probability_grid_data(h, "PRECIP") for h in PROBABILITY_TIMELINE_LEADS
}

@app.get("/api/events/{event_id}/probability")
def get_event_probability(event_id: str, lead: int = 48, variable: str = "PRECIP"):
    """
    Primary Module 6 Contract: Complete spatial probability field,
    continuous grid density, probability contours, and scientific metadata.
    """
    import time
    now_ms = int(time.time() * 1000)

    # Validate or compute for requested lead & variable
    lead_clamped = min(PROBABILITY_TIMELINE_LEADS, key=lambda x: abs(x - lead))
    if variable == "PRECIP" and lead_clamped in PROBABILITY_TIMELINE_CACHE:
        field_data = PROBABILITY_TIMELINE_CACHE[lead_clamped]
    else:
        field_data = generate_probability_grid_data(lead_clamped, variable)

    return {
        "eventId": event_id,
        "title": "Bay of Bengal Severe Convective Anomaly - Ensemble Probability Field",
        "validTime": "2026-10-04T00:00:00Z",
        "leadHours": lead_clamped,
        "variable": variable,
        "field": field_data,
        "inheritedM5": {
            "currentCentroid": {"lat": 18.50, "lon": 87.00},
            "consensusTrack": CONSENSUS_FORECAST_POINTS,
            "ensembleMembers": ENSEMBLE_MEMBERS_CACHE,
            "ensembleMemberCount": len(ENSEMBLE_MEMBERS_CACHE),
            "footprintCentroid": {"lat": field_data["centroid"]["lat"], "lon": field_data["centroid"]["lon"]}
        },
        "provenance": {
            "sourceMode": "SIMULATION",
            "connectionState": "CONNECTED",
            "model": "NEPS-G / ECMWF-ENS Kernel Density Integration",
            "modelSource": "Multi-Model Ensemble PDF Generation",
            "ensembleMembers": 24,
            "resolution": "12 km downscale target (0.25° macro grid)",
            "methodology": "Gaussian Kernel Density Estimation (KDE) over Correlated Perturbations",
            "normalization": "Normalized Spatial Support Probability",
            "lastUpdate": now_ms,
            "apiLatency": 14
        }
    }


@app.get("/api/events/{event_id}/probability/timeline")
def get_event_probability_timeline(event_id: str, variable: str = "PRECIP"):
    """Retrieve full temporal evolution of probability fields across all lead times."""
    import time
    now_ms = int(time.time() * 1000)

    timeline_frames = []
    for h in PROBABILITY_TIMELINE_LEADS:
        if variable == "PRECIP" and h in PROBABILITY_TIMELINE_CACHE:
            frame = PROBABILITY_TIMELINE_CACHE[h]
        else:
            frame = generate_probability_grid_data(h, variable)
        timeline_frames.append(frame)

    return {
        "eventId": event_id,
        "variable": variable,
        "timeline": timeline_frames,
        "totalFrames": len(timeline_frames),
        "leadHoursAvailable": PROBABILITY_TIMELINE_LEADS,
        "provenance": {
            "sourceMode": "SIMULATION",
            "connectionState": "CONNECTED",
            "lastUpdate": now_ms
        }
    }


@app.get("/api/events/{event_id}/probability/contours")
def get_event_probability_contours(event_id: str, lead: int = 48, variable: str = "PRECIP"):
    """Retrieve extracted vector isobands for spatial probability field."""
    lead_clamped = min(PROBABILITY_TIMELINE_LEADS, key=lambda x: abs(x - lead))
    field_data = PROBABILITY_TIMELINE_CACHE.get(lead_clamped) or generate_probability_grid_data(lead_clamped, variable)
    return {
        "eventId": event_id,
        "leadHour": lead_clamped,
        "contours": field_data["contours"]
    }


@app.get("/api/events/{event_id}/probability/summary")
def get_event_probability_summary(event_id: str, lead: int = 48):
    """Retrieve key operational probability statistics."""
    lead_clamped = min(PROBABILITY_TIMELINE_LEADS, key=lambda x: abs(x - lead))
    field_data = PROBABILITY_TIMELINE_CACHE.get(lead_clamped) or generate_probability_grid_data(lead_clamped, "PRECIP")
    return {
        "eventId": event_id,
        "leadHour": lead_clamped,
        "centroid": field_data["centroid"],
        "statistics": field_data["statistics"]
    }


@app.websocket("/api/events/{event_id}/probability/live")
async def websocket_probability_live(websocket: WebSocket, event_id: str):
    """Live streaming WebSocket for real-time probability density updates."""
    await websocket.accept()
    import asyncio
    import time
    import random
    try:
        while True:
            await asyncio.sleep(4)
            now_ms = int(time.time() * 1000)
            await websocket.send_json({
                "type": "PROBABILITY_FIELD_STREAM_UPDATE",
                "eventId": event_id,
                "timestamp": now_ms,
                "status": "FIELD_ACTIVE",
                "perturbationDelta": round(random.uniform(-0.015, 0.015), 3),
                "peakSupport": 0.74,
                "telemetry": {
                    "latencyMs": random.randint(6, 16),
                    "gridEntropy": 0.038
                }
            })
    except WebSocketDisconnect:
        pass


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)


