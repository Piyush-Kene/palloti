import json
import os
import math
from typing import List, Dict, Any

HOTSPOTS_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "accident_hotspots.json")

class AccidentService:
    _hotspots_cache = None

    @classmethod
    def get_all_hotspots(cls) -> List[Dict[str, Any]]:
        if cls._hotspots_cache is not None:
            return cls._hotspots_cache
        
        if os.path.exists(HOTSPOTS_PATH):
            try:
                with open(HOTSPOTS_PATH, "r", encoding="utf-8") as f:
                    cls._hotspots_cache = json.load(f)
                    return cls._hotspots_cache
            except Exception as e:
                print(f"Error loading hotspots from {HOTSPOTS_PATH}: {e}")
        
        # Hardcoded fallback list in case file is read-locked
        cls._hotspots_cache = [
            {
                "id": "HS-001",
                "name": "Karanja Lad Junction (NH-53 Merge)",
                "latitude": 20.4831,
                "longitude": 77.4897,
                "corridor": "Nagpur-Pune NH-53 / Samruddhi Interchange",
                "historical_incidents": 38,
                "severity": "CRITICAL",
                "high_risk_hours": "20:00 - 23:00",
                "primary_cause": "High speed highway merge, heavy freight blind spots",
                "base_risk": 82,
                "advice": "High collision frequency reported. Reduce speed to 60 km/h, watch for unlit commercial vehicles."
            },
            {
                "id": "HS-002",
                "name": "Sindkhed Raja Ghat Curve",
                "latitude": 19.9614,
                "longitude": 76.1432,
                "corridor": "Jalna-Sinnar Highway Link",
                "historical_incidents": 29,
                "severity": "HIGH",
                "high_risk_hours": "21:00 - 02:00",
                "primary_cause": "Hairpin descent prone to brake fade and wet skidding",
                "base_risk": 74,
                "advice": "Steep gradient descent. Use lower gears and maintain 50m vehicle gap."
            },
            {
                "id": "HS-003",
                "name": "Ahmednagar Bypass Bottleneck",
                "latitude": 19.0948,
                "longitude": 74.7480,
                "corridor": "Pune-Nagpur State Highway 27",
                "historical_incidents": 24,
                "severity": "MODERATE",
                "high_risk_hours": "17:00 - 21:00",
                "primary_cause": "Heavy mixed local traffic, unregulated median crossings",
                "base_risk": 64,
                "advice": "Expect sudden cross-traffic and tractor deceleration."
            }
        ]
        return cls._hotspots_cache

    @classmethod
    def find_hotspots_near_route(cls, geometry: List[List[float]], threshold_km: float = 25.0) -> List[Dict[str, Any]]:
        hotspots = cls.get_all_hotspots()
        matched = []
        for hs in hotspots:
            hs_lat = hs["latitude"]
            hs_lon = hs["longitude"]
            
            # Check minimum distance to any route coordinate point
            min_dist = float("inf")
            # Sample every 5th point to keep distance calculation fast
            step = max(1, len(geometry) // 40)
            for pt in geometry[::step]:
                dist = cls._haversine_distance(hs_lat, hs_lon, pt[0], pt[1])
                if dist < min_dist:
                    min_dist = dist
                    
            if min_dist <= threshold_km:
                matched.append(hs)
        return matched

    @staticmethod
    def _haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        R = 6371.0 # Earth radius in kilometers
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2.0) ** 2 +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
             math.sin(dlon / 2.0) ** 2)
        c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
        return R * c
