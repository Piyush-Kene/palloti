import os
import joblib
import numpy as np
import pandas as pd

MODEL_PATH = os.path.join(os.path.dirname(__file__), "saferoute_rf_model.joblib")

class RiskPredictor:
    def __init__(self):
        self.model = None
        self._load_model()

    def _load_model(self):
        if os.path.exists(MODEL_PATH):
            try:
                self.model = joblib.load(MODEL_PATH)
            except Exception as e:
                print(f"Warning: could not load model ({e}), using analytical heuristic fallback.")
                self.model = None
        else:
            self.model = None

    def predict_segment_risk(self, accident_count: int, accident_severity: int,
                             rainfall_mm: float, visibility_km: float,
                             road_condition: int, traffic_density: int,
                             hour_of_day: int, is_weekend: int, is_high_speed: int) -> dict:
        features = [
            accident_count, accident_severity, rainfall_mm,
            visibility_km, road_condition, traffic_density,
            hour_of_day, is_weekend, is_high_speed
        ]
        
        if self.model is not None:
            input_df = pd.DataFrame([features], columns=[
                "accident_count", "accident_severity", "rainfall_mm",
                "visibility_km", "road_condition", "traffic_density",
                "hour_of_day", "is_weekend", "is_high_speed"
            ])
            raw_score = float(self.model.predict(input_df)[0])
        else:
            # High-fidelity mathematical heuristic if model file isn't loaded yet
            raw_score = (
                (accident_count * 1.8) +
                (accident_severity * 8.5) +
                (min(rainfall_mm, 80) * 0.45) +
                (max(0, 5.0 - visibility_km) * 5.0) +
                ((5 - road_condition) * 4.5) +
                (traffic_density * 4.0) +
                (14.0 if (hour_of_day >= 20 or hour_of_day <= 4) else 0.0) +
                (5.0 if is_high_speed else 0.0)
            )

        score = max(5.0, min(99.0, round(raw_score, 1)))

        if score < 35:
            level = "LOW"
            color = "#10B981" # emerald
        elif score < 65:
            level = "MODERATE"
            color = "#F59E0B" # amber
        else:
            level = "HIGH"
            color = "#EF4444" # red

        # Sub-score drivers
        accident_sub = min(100.0, round((accident_count * 2.2 + accident_severity * 10), 1))
        weather_sub = min(100.0, round((rainfall_mm * 1.5 + max(0, 8.0 - visibility_km) * 8.0), 1))
        road_sub = min(100.0, round(((6 - road_condition) * 16.0), 1))
        traffic_sub = min(100.0, round((traffic_density * 22.0), 1))

        factors = []
        if accident_count >= 15 or accident_severity >= 2:
            factors.append(f"Frequent collision hotspot ({accident_count} past incidents recorded)")
        if rainfall_mm > 15:
            factors.append(f"Elevated hydroplaning risk (Rainfall: {rainfall_mm}mm)")
        if visibility_km < 4.0:
            factors.append(f"Reduced visibility ({visibility_km} km due to mist/precipitation)")
        if road_condition <= 2:
            factors.append("Uneven surface, pothole clusters or ongoing shoulder works")
        if hour_of_day >= 20 or hour_of_day <= 4:
            factors.append("Night travel window: high-beam glare & high commercial freight density")
        if traffic_density >= 3:
            factors.append("Heavy congestion causing abrupt braking zones")

        if not factors:
            factors.append("Optimal road conditions and low accident frequency")

        return {
            "risk_score": score,
            "risk_level": level,
            "risk_color": color,
            "sub_scores": {
                "accident_risk": accident_sub,
                "weather_risk": weather_sub,
                "road_risk": road_sub,
                "traffic_risk": traffic_sub
            },
            "factors": factors
        }

predictor = RiskPredictor()
