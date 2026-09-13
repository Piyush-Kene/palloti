from fastapi import APIRouter
from app.services.accident_service import AccidentService
import random

router = APIRouter(prefix="/insights", tags=["Safety Insights"])

@router.get("/summary")
def get_insights_summary():
    hotspots = AccidentService.get_all_hotspots()
    return {
        "total_journeys_analyzed": 14208,
        "preventable_crashes_avoided_est": 482,
        "average_route_risk": 48.6,
        "safer_routes_accepted_pct": 74.2,
        "high_risk_zones_cataloged": len(hotspots),
        "monthly_trend": [
            {"month": "May", "analyzed": 1940, "risk_avg": 54, "avoided_incidents": 62},
            {"month": "Jun", "analyzed": 2450, "risk_avg": 58, "avoided_incidents": 84},
            {"month": "Jul", "analyzed": 3100, "risk_avg": 62, "avoided_incidents": 115},
            {"month": "Aug", "analyzed": 3480, "risk_avg": 51, "avoided_incidents": 98},
            {"month": "Sep", "analyzed": 3238, "risk_avg": 44, "avoided_incidents": 123}
        ],
        "weather_impact_distribution": [
            {"name": "Heavy Rain & Waterlogging", "share": 38},
            {"name": "Dense Fog / Low Visibility", "share": 24},
            {"name": "High-Speed Median Merges", "share": 22},
            {"name": "Night Freight Fatigue", "share": 16}
        ],
        "hotspots": hotspots
    }
