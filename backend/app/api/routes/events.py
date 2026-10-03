"""Weather-event retrieval, alerts and live WebSocket feed."""
import asyncio
import json
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse
from app.api.routes.inference import require_api_key
from app.schemas.weather_events import EventResponse
from app.services.inference_queue import inference_queue
from app.services.live_updates import live_updates

router = APIRouter(tags=["Weather Events"])


def event_or_404(event_id: str) -> dict:
    event = inference_queue.store.get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Weather event not found")
    return event


@router.get("/events/{event_id}", response_model=EventResponse, dependencies=[Depends(require_api_key)])
async def get_event(event_id: str) -> EventResponse:
    return EventResponse(**event_or_404(event_id))


@router.get("/events/{event_id}/trajectory", dependencies=[Depends(require_api_key)])
async def trajectory(event_id: str) -> dict:
    event = event_or_404(event_id)
    return {"event_id": event_id, "trajectory": event["trajectory"], "forecast_hours": event["forecast_hours"]}


@router.get("/events/{event_id}/probability", dependencies=[Depends(require_api_key)])
async def probability(event_id: str) -> dict:
    event = event_or_404(event_id)
    return {"event_id": event_id, "hazard": event["hazard"], "probability": event["probability"], "severity": event["severity"]}


@router.get("/events/{event_id}/alert", dependencies=[Depends(require_api_key)])
async def alert(event_id: str) -> dict:
    event = event_or_404(event_id)
    if event["severity"] not in ("high", "severe"):
        return {"event_id": event_id, "alert": None, "reason": "Severity below alert threshold"}
    west, south, east, north = event["bbox"]
    return {"event_id": event_id, "alert": {"category": event["severity"], "hazard": event["hazard"], "probability": event["probability"], "impact_radius_km": 5, "centroid": [(west + east) / 2, (south + north) / 2]}}


@router.websocket("/events/live")
async def live_events(websocket: WebSocket) -> None:
    # Accept connections freely in local development mode
    try:
        from app.config import settings
    except ImportError:
        from app.config import settings
    configured_key = getattr(settings, "WEATHER_API_KEY", "")
    param_key = websocket.query_params.get("api_key")
    if configured_key and configured_key != "change-me-in-production" and param_key != configured_key:
        await websocket.close(code=1008)
        return
    await websocket.accept()
    subscription = live_updates.subscribe()
    try:
        while True:
            message = await subscription.get()
            await websocket.send_json(message)
    except (WebSocketDisconnect, asyncio.CancelledError):
        pass
    finally:
        live_updates.unsubscribe(subscription)


@router.get("/events/live/sse", dependencies=[Depends(require_api_key)])
async def live_events_sse() -> StreamingResponse:
    """Server-Sent Events alternative for dashboards that do not use WebSockets."""
    subscription = live_updates.subscribe()

    async def stream():
        try:
            while True:
                message = await subscription.get()
                yield f"event: {message.get('type', 'event')}\ndata: {json.dumps(message)}\n\n"
        finally:
            live_updates.unsubscribe(subscription)

    return StreamingResponse(stream(), media_type="text/event-stream", headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})
