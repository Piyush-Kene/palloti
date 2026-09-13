from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime
import json

from app.database.session import get_db
from app.api.deps import get_optional_current_user, get_current_user
from app.models.user import User, JourneyHistory
from app.schemas.all_schemas import RouteAnalyzeRequest, RouteAnalysisResponse
from app.services.map_service import MapService
from app.services.risk_engine import RiskEngine

router = APIRouter(prefix="/routes", tags=["Routes"])

@router.post("/analyze", response_model=RouteAnalysisResponse)
async def analyze_route(
    req: RouteAnalyzeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_optional_current_user)
):
    # Geocode origin
    if req.origin_coords:
        start_lat, start_lon = req.origin_coords.lat, req.origin_coords.lon
        orig_name = req.origin_coords.name or req.origin
    else:
        orig_res = await MapService.geocode_location(req.origin)
        if not orig_res:
            raise HTTPException(status_code=400, detail=f"Could not locate origin '{req.origin}'. Please check spelling.")
        start_lat, start_lon = orig_res["lat"], orig_res["lon"]
        orig_name = orig_res["name"]

    # Geocode destination
    if req.dest_coords:
        end_lat, end_lon = req.dest_coords.lat, req.dest_coords.lon
        dst_name = req.dest_coords.name or req.destination
    else:
        dst_res = await MapService.geocode_location(req.destination)
        if not dst_res:
            raise HTTPException(status_code=400, detail=f"Could not locate destination '{req.destination}'. Please check spelling.")
        end_lat, end_lon = dst_res["lat"], dst_res["lon"]
        dst_name = dst_res["name"]

    dep_time = req.departure_time or datetime.now().strftime("%Y-%m-%d %H:%M")
    hour = 20
    try:
        if "T" in dep_time:
            hour = int(dep_time.split("T")[1].split(":")[0])
        elif " " in dep_time:
            hour = int(dep_time.split(" ")[1].split(":")[0])
    except Exception:
        hour = 20

    analysis = await RiskEngine.analyze_full_journey(
        start_lat=start_lat,
        start_lon=start_lon,
        end_lat=end_lat,
        end_lon=end_lon,
        origin_name=orig_name,
        dest_name=dst_name,
        departure_hour=hour,
        vehicle_type=req.vehicle_type or "car",
        force_demo=req.force_demo_mode or False
    )

    resp = RouteAnalysisResponse(
        is_demo_data=req.force_demo_mode or ("Nagpur" in orig_name and "Pune" in dst_name),
        origin_name=orig_name,
        destination_name=dst_name,
        departure_time=dep_time,
        primary_route=analysis["primary"],
        safer_alternative_route=analysis["alternative"],
        weather_summary=analysis["weather"],
        analysis_timestamp=datetime.utcnow().isoformat()
    )

    # Save to history if authenticated
    if current_user:
        history_item = JourneyHistory(
            user_id=current_user.id,
            origin_name=orig_name,
            destination_name=dst_name,
            origin_lat=start_lat,
            origin_lon=start_lon,
            dest_lat=end_lat,
            dest_lon=end_lon,
            distance_km=analysis["primary"].distance_km,
            duration_min=analysis["primary"].duration_min,
            risk_score=analysis["primary"].risk_score,
            risk_level=analysis["primary"].risk_level,
            safer_route_taken=False,
            analysis_payload=resp.model_dump_json()
        )
        db.add(history_item)
        db.commit()

    return resp

@router.get("/history")
def get_user_journey_history(
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    items = db.query(JourneyHistory).filter(JourneyHistory.user_id == current_user.id).order_by(JourneyHistory.created_at.desc()).limit(limit).all()
    return [
        {
            "id": h.id,
            "origin_name": h.origin_name,
            "destination_name": h.destination_name,
            "distance_km": h.distance_km,
            "duration_min": h.duration_min,
            "risk_score": h.risk_score,
            "risk_level": h.risk_level,
            "safer_route_taken": h.safer_route_taken,
            "created_at": h.created_at.isoformat()
        } for h in items
    ]
