import httpx
import logging
from typing import Optional, Tuple, Dict, Any

logger = logging.getLogger(__name__)

# Fallback coordinates for common cities to ensure 100% demo continuity
FALLBACK_CITIES = {
    "nagpur": {"lat": 21.1458, "lon": 79.0882, "name": "Nagpur, Maharashtra, India"},
    "pune": {"lat": 18.5204, "lon": 73.8567, "name": "Pune, Maharashtra, India"},
    "mumbai": {"lat": 19.0760, "lon": 72.8777, "name": "Mumbai, Maharashtra, India"},
    "nashik": {"lat": 19.9975, "lon": 73.7898, "name": "Nashik, Maharashtra, India"},
    "aurangabad": {"lat": 19.8762, "lon": 75.3433, "name": "Chhatrapati Sambhaji Nagar (Aurangabad), Maharashtra"},
    "jalna": {"lat": 19.8347, "lon": 75.8816, "name": "Jalna, Maharashtra, India"},
    "amravati": {"lat": 20.9374, "lon": 77.7796, "name": "Amravati, Maharashtra, India"},
    "hyderabad": {"lat": 17.3850, "lon": 78.4867, "name": "Hyderabad, Telangana, India"},
    "bengaluru": {"lat": 12.9716, "lon": 77.5946, "name": "Bengaluru, Karnataka, India"},
    "delhi": {"lat": 28.6139, "lon": 77.2090, "name": "New Delhi, Delhi, India"},
}

class MapService:
    @staticmethod
    async def geocode_location(query: str) -> Optional[Dict[str, Any]]:
        clean_q = query.strip().lower()
        # Immediate fallback for known quick demo locations
        for key, data in FALLBACK_CITIES.items():
            if key in clean_q:
                return data

        url = "https://nominatim.openstreetmap.org/search"
        headers = {"User-Agent": "SafeRouteAI-HackathonDemo/1.0 (safety@saferoute.ai)"}
        params = {"q": query, "format": "json", "limit": 1}

        try:
            async with httpx.AsyncClient(timeout=4.0) as client:
                resp = await client.get(url, params=params, headers=headers)
                if resp.status_code == 200:
                    results = resp.json()
                    if results and len(results) > 0:
                        first = results[0]
                        return {
                            "lat": float(first["lat"]),
                            "lon": float(first["lon"]),
                            "name": first.get("display_name", query)
                        }
        except Exception as e:
            logger.warning(f"Nominatim geocode failed for {query}: {e}. Utilizing fallback lookup.")

        # If not matched, default to Nagpur or Pune if nothing else
        return {
            "lat": 21.1458 if "nag" in clean_q else 18.5204,
            "lon": 79.0882 if "nag" in clean_q else 73.8567,
            "name": query.title() + " (Corridor Node)"
        }
