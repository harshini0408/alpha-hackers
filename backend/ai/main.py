"""
LoRRI AI — FastAPI Backend
Endpoints for freight rate prediction, delay prediction, and maturity scoring.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from models import FreightRateModel, DelayPredictionModel, MaturityScorer

app = FastAPI(title="LoRRI AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# ─── Initialize models at startup ─────────────────────────────────────────────
freight_model = FreightRateModel()
delay_model = DelayPredictionModel()
maturity_scorer = MaturityScorer()


# ─── Request / Response schemas ────────────────────────────────────────────────

class FreightRateRequest(BaseModel):
    distance_km: float = Field(..., gt=0, le=5000)
    truck_type: int = Field(..., ge=0, le=4, description="0=Mini, 1=LCV, 2=ICV, 3=MCV, 4=HCV")
    fuel_price: float = Field(default=100.0, gt=50, le=200)
    demand_index: float = Field(default=1.0, gt=0, le=3)


class FreightRateResponse(BaseModel):
    predicted_rate: float
    currency: str = "INR"


class DelayRequest(BaseModel):
    route_distance_km: float = Field(..., gt=0, le=5000)
    weather: int = Field(..., ge=0, le=4, description="0=Clear,1=Cloudy,2=Rain,3=Heavy Rain,4=Storm")
    traffic: int = Field(..., ge=0, le=3, description="0=Low,1=Moderate,2=Heavy,3=Severe")
    historical_delay_pct: float = Field(default=0.1, ge=0, le=1)


class DelayResponse(BaseModel):
    risk_score: int
    risk_level: str
    delay_probability: float


class MaturityRequest(BaseModel):
    fleet_size: int = Field(..., gt=0, le=10000)
    digital_adoption: float = Field(..., ge=0, le=1, description="0=none, 1=fully digital")
    network_complexity: int = Field(..., ge=1, le=10)


class MaturityResponse(BaseModel):
    score: int
    level: str
    suggestions: list[str]


# ─── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict/freight-rate", response_model=FreightRateResponse)
def predict_freight_rate(req: FreightRateRequest):
    rate = freight_model.predict(req.distance_km, req.truck_type, req.fuel_price, req.demand_index)
    return FreightRateResponse(predicted_rate=round(rate, 2))


@app.post("/predict/delay", response_model=DelayResponse)
def predict_delay(req: DelayRequest):
    result = delay_model.predict(req.route_distance_km, req.weather, req.traffic, req.historical_delay_pct)
    return DelayResponse(**result)


@app.post("/assess/maturity", response_model=MaturityResponse)
def assess_maturity(req: MaturityRequest):
    result = maturity_scorer.score(req.fleet_size, req.digital_adoption, req.network_complexity)
    return MaturityResponse(**result)
