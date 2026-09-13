from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "SafeRoute AI"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "saferoute-ai-super-secret-jwt-key-change-in-prod-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
    
    # SQLite fallback
    DATABASE_URL: str = "sqlite:///./saferoute.db"
    
    # Demo configuration
    DEMO_MODE_DEFAULT: bool = False

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
