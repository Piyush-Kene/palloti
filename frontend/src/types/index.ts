export interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface HotspotAlert {
  id: string;
  name: string;
  lat: number;
  lon: number;
  severity: string;
  historical_incidents: number;
  high_risk_hours: string;
  primary_cause: string;
  advice: string;
}

export interface SegmentRisk {
  segment_id: number;
  name: string;
  start_point: [number, number];
  end_point: [number, number];
  distance_km: number;
  duration_min: number;
  risk_score: number;
  risk_level: 'LOW' | 'MODERATE' | 'HIGH';
  risk_color: string;
  rainfall_mm: number;
  visibility_km: number;
  weather_condition: string;
  accident_count: number;
  primary_risk_factor: string;
  advice: string;
}

export interface RouteOption {
  route_id: string;
  title: string;
  is_recommended_safer: boolean;
  distance_km: number;
  duration_min: number;
  risk_score: number;
  risk_level: 'LOW' | 'MODERATE' | 'HIGH';
  risk_color: string;
  geometry: [number, number][];
  segments: SegmentRisk[];
  hotspots: HotspotAlert[];
  sub_scores: {
    accident_risk: number;
    weather_risk: number;
    road_risk: number;
    traffic_risk: number;
  };
  primary_factors: string[];
  recommendation: string;
}

export interface WeatherSummary {
  temperature_c: number;
  humidity_pct: number;
  precipitation_mm: number;
  visibility_km: number;
  wind_speed_kmh: number;
  weather_code: number;
  condition: string;
  source: string;
}

export interface RouteAnalysisResponse {
  is_demo_data: boolean;
  origin_name: string;
  destination_name: string;
  departure_time: string;
  primary_route: RouteOption;
  safer_alternative_route?: RouteOption;
  weather_summary: WeatherSummary;
  analysis_timestamp: string;
}

export interface JourneyHistoryItem {
  id: number;
  origin_name: string;
  destination_name: string;
  distance_km: number;
  duration_min: number;
  risk_score: number;
  risk_level: string;
  safer_route_taken: boolean;
  created_at: string;
}
