from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(150), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    journeys = relationship("JourneyHistory", back_populates="user")

class JourneyHistory(Base):
    __tablename__ = "journey_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    origin_name = Column(String(255), nullable=False)
    destination_name = Column(String(255), nullable=False)
    origin_lat = Column(Float, nullable=False)
    origin_lon = Column(Float, nullable=False)
    dest_lat = Column(Float, nullable=False)
    dest_lon = Column(Float, nullable=False)
    distance_km = Column(Float, nullable=False)
    duration_min = Column(Float, nullable=False)
    risk_score = Column(Float, nullable=False)
    risk_level = Column(String(50), nullable=False)
    safer_route_taken = Column(Boolean, default=False)
    analysis_payload = Column(Text, nullable=True) # JSON representation
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="journeys")
