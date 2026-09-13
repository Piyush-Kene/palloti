# SafeRoute AI - Data Sources & Methodology

## Overview
SafeRoute AI integrates historical accident blackspot reports, live meteorological feeds, and simulated risk patterns to generate explainable road safety scores.

## Data Attribution & Real Sources Reference
1. **Ministry of Road Transport and Highways (MoRTH), India**:
   - Annual Report on "Road Accidents in India"
   - Blackspot identification guidelines based on accident frequency (>10 fatalities or >5 severe crashes within 500m over 3 years)
2. **OpenStreetMap (OSM) & OSRM**:
   - Road classification (Highways, Expressways, State Highways, Arterial roads)
   - Real-world routing geometry and turn-by-turn coordinate streams
3. **Open-Meteo Weather API**:
   - Free, no-key, open-access meteorological modeling
   - Real-time rainfall (mm), surface visibility (km), wind speed, and precipitation probability
4. **Synthetic Hotspot & Incident Augmentation**:
   - For demo continuity, simulated blackspot densities and construction zones are anchored to key Indian transit corridors (e.g., Nagpur - Amravati - Jalna - Pune / Samruddhi Expressway corridor, NH48, Mumbai-Pune Expressway).

## Schema
The sample dataset (`data/accident_hotspots.json` and `data/historical_accidents.csv`) includes:
- `id`: Unique record identifier
- `location_name`: Human readable landmark or stretch
- `latitude`, `longitude`: Coordinate anchor
- `corridor`: Highway or expressway label (e.g. NH-53, NH-60, Samruddhi)
- `historical_incidents`: Number of recorded accidents over the monitoring window
- `fatalities`: Number of recorded fatalities
- `high_risk_hours`: e.g. "20:00 - 23:00" (twilight / peak freight hours)
- `primary_cause`: e.g., "Sharp curve + Low visibility", "Heavy freight merging", "Waterlogging prone"
- `base_risk_score`: 1-100 baseline prior to dynamic weather weighting
