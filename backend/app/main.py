from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database.session import engine, Base
from app.api import auth, routes, insights

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Intelligent Road-Risk Awareness and Safer-Route Recommendation Platform (R1-03 Preventable Road Accidents)",
    version="1.0.0"
)

# Set CORS origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow any origin for hackathon demo convenience
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(routes.router, prefix=settings.API_V1_STR)
app.include_router(insights.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "project": "SafeRoute AI",
        "tagline": "Know the Risk. Before You Reach It.",
        "version": "1.0.0",
        "status": "Operational",
        "docs_url": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "engine": "RandomForest + OSRM + Open-Meteo"}
