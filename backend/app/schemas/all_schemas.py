from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenPayload(BaseModel):
    sub: Optional[int] = None

class LatLng(BaseModel):
    lat: float
    lon: float
    name: Optional[str] = None

class RouteAnalyzeRequest(BaseModel):
    origin: str
    destination: str
    origin_coords: Optional[LatLng] = None
    dest_coords: Optional[LatLng] = None
    departure_time: Optional[str] = None
    vehicle_type: Optional[str] = "car" # car, two_wheeler, commercial_truck
    force_demo_mode: Optional[bool] = False

class SegmentRisk(BaseModel):
    segment_id: int
    name: str
    start_point: List[float] # [lat, lon]
    end_point: List[float]
    distance_km: float
    duration_min: float
    risk_score: float
    risk_level: str
    risk_color: str
    rainfall_mm: float
    visibility_km: float
    weather_condition: str
    accident_count: int
    primary_risk_factor: str
    advice: str

class HotspotAlert(BaseModel):
    id: str
    name: str
    lat: float
    lon: float
    severity: str
    historical_incidents: int
    high_risk_hours: str
    primary_cause: str
    advice: str

class RouteOption(BaseModel):
    route_id: str
    title: str
    is_recommended_safer: bool
    distance_km: float
    duration_min: float
    risk_score: float
    risk_level: str
    risk_color: str
    geometry: List[List[float]] # [[lat, lon], ...]
    segments: List[SegmentRisk]
    hotspots: List[HotspotAlert]
    sub_scores: dict
    primary_factors: List[str]
    recommendation: str

class RouteAnalysisResponse(BaseModel):
    is_demo_data: bool
    origin_name: str
    destination_name: str
    departure_time: str
    primary_route: RouteOption
    safer_alternative_route: Optional[RouteOption] = None
    weather_summary: dict
    analysis_timestamp: str
