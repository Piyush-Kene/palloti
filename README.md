# ==================================================
#                  SAFEROUTE AI
# ==================================================
> **"Know the Risk. Before You Reach It."**  
> *Built for R1-03 — Preventable Road Accidents (Hackathon Prototype)*

[![Python 3.12](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green.svg)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.5-orange.svg)](https://scikit-learn.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 1. Problem Statement & Solution

### Problem:
Traditional navigation platforms focus solely on finding the fastest route: *"Here is your route. You will arrive in 45 minutes."*  
However, they do not warn drivers that their chosen shortcut passes through a high-fatality accident blackspot during peak commercial freight hours, torrential rainfall, or dense fog. Drivers are blindsided by predictable, preventable hazards.

### The SafeRoute AI Paradigm:
**"Here is your route, these are the risks ahead, this is why they matter, and this is a safer alternative."**
SafeRoute AI integrates historical accident statistics, live Open-Meteo meteorological telemetry, road-infrastructure classifications, and an explainable Scikit-Learn Random Forest model to produce:
1. **Predicted Route Risk Score (0 - 100)**
2. **Accident Blackspot & Incident Alerts**
3. **Severe Weather Warnings (Hydroplaning, Visibility < 2.5 km)**
4. **Segment-by-Segment Risk Diagnostics**
5. **AI Recommended Safer Alternative Route** (e.g., adding +20 mins to cut predicted crash risk by >50%)

---

## 2. Architecture & Monorepo Structure

```
aryan/
├── backend/                  # FastAPI & SQLAlchemy Backend
│   ├── app/
│   │   ├── api/              # Auth, Routes, Insights endpoints
│   │   ├── database/         # SQLite ORM session engine
│   │   ├── models/           # User & JourneyHistory models
│   │   ├── schemas/          # Pydantic v2 schemas
│   │   ├── services/         # MapService, WeatherService, RiskEngine, AccidentService
│   │   └── utils/            # JWT authentication & security
│   └── requirements.txt
├── frontend/                 # React 18 + Vite + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/       # RiskGauge, RiskMap (Leaflet), RouteComparison, WeatherCard
│   │   ├── pages/            # LandingPage, PlanRoutePage, Dashboard, Insights, Profile, History
│   │   ├── services/         # ApiService with resilient offline fallback
│   │   └── utils/            # demoData.ts (100% offline hackathon continuity)
│   └── package.json
├── data/                     # Corridor & accident hotspot datasets
│   ├── accident_hotspots.json
│   ├── synthetic_risk_training_data.csv
│   └── DATA_SOURCES.md
├── ml/                       # Machine Learning Risk Pipeline
│   ├── train_model.py        # Random Forest training script
│   ├── predict.py            # Real-time multi-variate predictor
│   └── saferoute_rf_model.joblib
├── .env.example
└── README.md
```

---

## 3. Technology Stack & Free APIs

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Leaflet & React-Leaflet (CartoDB Dark Tiles), Recharts, Lucide Icons.
- **Backend**: Python 3.12, FastAPI, Pydantic v2, SQLAlchemy, Uvicorn, Python-Jose.
- **AI/ML**: Scikit-Learn Random Forest Regressor, Pandas, NumPy, Joblib.
- **Free/Open APIs Used (Zero API Keys Required)**:
  - **OpenStreetMap & Nominatim**: Free geocoding and location resolution.
  - **Project OSRM**: Free open routing service for turn-by-turn coordinate vectors.
  - **Open-Meteo API**: Free, high-accuracy meteorological modeling (temperature, precipitation, surface visibility).
  - **CartoDB Dark Basemaps**: Free high-contrast dark tiles for night-first safety mapping.

---

## 4. Quick Start & Installation

### Step 1: Clone and Set Up Backend
```bash
cd backend
pip install -r requirements.txt
python ml/train_model.py # Optional: model is pre-trained and saved
python -m uvicorn app.main:app --reload --port 8000
```
*Backend runs at `http://localhost:8000` (Swagger UI at `http://localhost:8000/docs`).*

### Step 2: Set Up Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend launches at `http://localhost:5173`.*

---

## 5. Judge Demo Flow (Step-by-Step)

1. **Launch Landing Page**: Open `http://localhost:5173`. Notice the cinematic dark UI, animated gradient risk badges, and the interactive **"Reactive vs Predictive Safety"** architecture section.
2. **1-Click Judge Access**: Click **"[ 1-Click Judge Demo ]"** or **"Check My Route"** on the hero banner. It instantly logs in with the built-in judge test profile (`judge@saferoute.ai`).
3. **Evaluate Nagpur ➔ Pune Corridor**:
   - The route planner automatically fills **From: Nagpur** and **To: Pune**.
   - Click **"Analyze Route Safety"**.
4. **Cinematic Analysis Sequence**:
   - View the 5-step animated radar scan as it analyzes road curvature, blackspot density, and live Open-Meteo precipitation.
5. **Inspect the Predicted Risk Score**:
   - The animated circular gauge reveals **Risk: 74/100 (HIGH RISK)**.
   - Inspect the sub-score breakdown (Accident Risk: 86, Weather Impact: 78, Road Quality: 65).
6. **Interact with the Risk Map**:
   - Observe the pulsed red pins along the NH-53 highway corridor.
   - Click on the **Karanja Lad Hotspot** marker to inspect the popup showing 38 historical fatal crashes, peak collision hours (20:00 - 23:00), and recommended defensive actions.
7. **Take the Safer Route**:
   - Click **"Take Safer Route"** on the comparison card.
   - The map animates and switches to the green **Expressway Bypass Corridor**.
   - The risk gauge drops from **74 (HIGH) down to 34 (LOW)**, trading only +24 km (+20 mins) for a 50% crash hazard reduction!
8. **Explore Analytics & History**:
   - Navigate to **Safety Insights** to review the Recharts monthly averted collisions trend and hazard distribution.

---

## 6. Offline Demo Mode (Resilience Guarantee)

Network interruptions during hackathons will **never** break SafeRoute AI.  
The client implements a transparent fallback layer:
- If OSRM or Open-Meteo encounters rate-limiting or latency, high-fidelity bezier corridor generators and regional meteorological models activate automatically.
- A **"Demo Mode (Offline Safe)"** badge in the header ensures judges and reviewers know exactly whether live or demo telemetry is being visualized.

---

## 7. Future Roadmap
- Integration of live crowd-sourced incident feeds (e.g. pothole detection via mobile accelerometer).
- Vehicle CAN-bus OBD-II telemetry pairing for real-time brake heat and tire tread wear modeling.
- Offline vector map caching for remote mountainous corridors with zero cell connectivity.
