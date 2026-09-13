"""
SafeRoute AI ML Training Script
Trains a Random Forest Regressor and Classifier on road safety features:
- accident_count
- accident_severity_index (1 to 3)
- rainfall_mm
- visibility_km
- road_condition_score (1 to 5: 1=Poor, 5=Excellent)
- traffic_density (1 to 4: 1=Low, 4=Severe)
- hour_of_day (0 to 23)
- is_weekend (0 or 1)
- is_high_speed_expressway (0 or 1)
Target: route_segment_risk_score (0 to 100)
"""

import os
import json
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib

def generate_synthetic_training_data(n_samples=2500):
    np.random.seed(42)
    
    accident_count = np.random.poisson(lam=12, size=n_samples)
    accident_severity = np.random.choice([1, 2, 3], size=n_samples, p=[0.5, 0.35, 0.15])
    rainfall_mm = np.random.exponential(scale=15, size=n_samples)
    visibility_km = np.clip(np.random.normal(loc=8.0, scale=4.0, size=n_samples), 0.2, 15.0)
    road_condition = np.random.choice([1, 2, 3, 4, 5], size=n_samples, p=[0.1, 0.2, 0.4, 0.2, 0.1])
    traffic_density = np.random.choice([1, 2, 3, 4], size=n_samples, p=[0.25, 0.4, 0.25, 0.1])
    hour_of_day = np.random.randint(0, 24, size=n_samples)
    is_weekend = np.random.choice([0, 1], size=n_samples, p=[0.7, 0.3])
    is_high_speed = np.random.choice([0, 1], size=n_samples, p=[0.6, 0.4])
    
    # Ground truth formula for realistic risk simulation
    risk = (
        (accident_count * 1.8) +
        (accident_severity * 8.5) +
        (np.clip(rainfall_mm, 0, 80) * 0.45) +
        (np.maximum(0, 5.0 - visibility_km) * 5.0) +
        ((5 - road_condition) * 4.5) +
        (traffic_density * 4.0) +
        (np.where((hour_of_day >= 20) | (hour_of_day <= 4), 14.0, 0.0)) + # Night danger
        (is_high_speed * 5.0) +
        np.random.normal(0, 3.5, size=n_samples) # Noise
    )
    
    risk_score = np.clip(risk, 5, 98)
    
    df = pd.DataFrame({
        "accident_count": accident_count,
        "accident_severity": accident_severity,
        "rainfall_mm": np.round(rainfall_mm, 1),
        "visibility_km": np.round(visibility_km, 2),
        "road_condition": road_condition,
        "traffic_density": traffic_density,
        "hour_of_day": hour_of_day,
        "is_weekend": is_weekend,
        "is_high_speed": is_high_speed,
        "risk_score": np.round(risk_score, 1)
    })
    
    return df

def train_and_export():
    print("Generating synthetic road accident safety dataset...")
    df = generate_synthetic_training_data()
    
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    os.makedirs(data_dir, exist_ok=True)
    csv_path = os.path.join(data_dir, "synthetic_risk_training_data.csv")
    df.to_csv(csv_path, index=False)
    print(f"Saved dataset to {csv_path}")
    
    feature_cols = [
        "accident_count", "accident_severity", "rainfall_mm",
        "visibility_km", "road_condition", "traffic_density",
        "hour_of_day", "is_weekend", "is_high_speed"
    ]
    
    X = df[feature_cols]
    y = df["risk_score"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Regressor for explainable risk assessment...")
    model = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"Model evaluation: MSE = {mse:.2f}, R2 Score = {r2:.4f}")
    
    model_dir = os.path.dirname(__file__)
    model_path = os.path.join(model_dir, "saferoute_rf_model.joblib")
    joblib.dump(model, model_path)
    print(f"Saved model to {model_path}")
    
    feature_importances = dict(zip(feature_cols, [round(float(val), 4) for val in model.feature_importances_]))
    meta_path = os.path.join(model_dir, "model_meta.json")
    with open(meta_path, "w") as f:
        json.dump({
            "model_type": "RandomForestRegressor",
            "features": feature_cols,
            "feature_importances": feature_importances,
            "r2_score": round(float(r2), 4),
            "mse": round(float(mse), 2)
        }, f, indent=2)
    print(f"Exported metadata to {meta_path}")

if __name__ == "__main__":
    train_and_export()
