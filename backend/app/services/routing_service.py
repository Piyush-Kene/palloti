import httpx
import logging
from typing import List, Dict, Any, Tuple
import math

logger = logging.getLogger(__name__)

class RoutingService:
    @staticmethod
    async def get_osrm_route(start_lat: float, start_lon: float,
                             end_lat: float, end_lon: float) -> Dict[str, Any]:
        """
        Queries OSRM driving profile. Falls back to realistic corridor interpolation if API rate-limited.
        """
        url = f"https://router.project-osrm.org/route/v1/driving/{start_lon},{start_lat};{end_lon},{end_lat}?overview=full&geometries=geojson&steps=true"
        
        try:
            async with httpx.AsyncClient(timeout=6.0) as client:
                resp = await client.get(url)
                if resp.status_code == 200:
                    data = resp.json()
                    routes = data.get("routes", [])
                    if routes:
                        r = routes[0]
                        # Convert [lon, lat] to [lat, lon]
                        coords = [[pt[1], pt[0]] for pt in r["geometry"]["coordinates"]]
                        return {
                            "distance_km": round(r["distance"] / 1000.0, 1),
                            "duration_min": round(r["duration"] / 60.0, 0),
                            "geometry": coords,
                            "is_demo_fallback": False
                        }
        except Exception as e:
            logger.warning(f"OSRM route query error: {e}. Activating route geometry generator.")

        # Fallback generator for realistic route rendering
        return RoutingService.generate_fallback_route(start_lat, start_lon, end_lat, end_lon, is_alternative=False)

    @staticmethod
    def generate_fallback_route(start_lat: float, start_lon: float,
                                end_lat: float, end_lon: float,
                                is_alternative: bool = False) -> Dict[str, Any]:
        """
        Creates smooth natural curved geometries between points with waypoint nudges.
        """
        num_points = 50
        coords = []
        
        # Midpoint curvature offset
        # For alternative route, curve towards an expressway bypass or smoother corridor
        curve_factor = 0.55 if is_alternative else -0.35
        
        for i in range(num_points + 1):
            t = i / float(num_points)
            # Quadratic bezier interpolation
            mid_lat = (start_lat + end_lat) / 2.0 + (curve_factor * 0.4)
            mid_lon = (start_lon + end_lon) / 2.0 + (curve_factor * 0.6)
            
            lat = (1 - t)**2 * start_lat + 2 * (1 - t) * t * mid_lat + t**2 * end_lat
            lon = (1 - t)**2 * start_lon + 2 * (1 - t) * t * mid_lon + t**2 * end_lon
            
            # Micro-wobble for realistic road curve
            if 0 < i < num_points:
                lat += math.sin(i * 0.8) * 0.03
                lon += math.cos(i * 0.8) * 0.03
                
            coords.append([round(lat, 5), round(lon, 5)])

        # Calculate approximate distance
        direct_dist = math.sqrt((end_lat - start_lat)**2 + (end_lon - start_lon)**2) * 111.0
        total_dist = round(direct_dist * (1.28 if is_alternative else 1.22), 1)
        speed_kmh = 75.0 if is_alternative else 65.0
        duration_min = round((total_dist / speed_kmh) * 60.0)

        return {
            "distance_km": total_dist,
            "duration_min": duration_min,
            "geometry": coords,
            "is_demo_fallback": True
        }
