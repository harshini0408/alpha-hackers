"""
LoRRI AI — ML Models
Freight rate prediction, delay prediction, and logistics maturity scoring.
"""

import numpy as np
from sklearn.ensemble import GradientBoostingRegressor, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler


# ─── Freight Rate Prediction ───────────────────────────────────────────────────
# Features: distance_km, truck_type_idx, fuel_price, demand_index
# Target: freight_rate (₹)

def _generate_freight_data(n: int = 500):
    rng = np.random.RandomState(42)
    distance = rng.uniform(200, 3000, n)
    truck_type = rng.randint(0, 5, n)
    fuel_price = rng.uniform(85, 115, n)
    demand_index = rng.uniform(0.5, 1.5, n)

    rate = (
        5000
        + distance * 8.5
        + truck_type * 3000
        + (fuel_price - 90) * 120
        + demand_index * 4000
        + rng.normal(0, 800, n)
    )
    X = np.column_stack([distance, truck_type, fuel_price, demand_index])
    return X, rate


class FreightRateModel:
    def __init__(self):
        self.scaler = StandardScaler()
        self.model = GradientBoostingRegressor(
            n_estimators=100, max_depth=4, learning_rate=0.1, random_state=42
        )
        self._train()

    def _train(self):
        X, y = _generate_freight_data()
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)

    def predict(self, distance: float, truck_type: int, fuel_price: float, demand_index: float) -> float:
        X = np.array([[distance, truck_type, fuel_price, demand_index]])
        X_scaled = self.scaler.transform(X)
        return float(self.model.predict(X_scaled)[0])


# ─── Delay Prediction ─────────────────────────────────────────────────────────
# Features: route_distance, weather_idx, traffic_idx, historical_delay_pct
# Target: delayed (0/1)

def _generate_delay_data(n: int = 600):
    rng = np.random.RandomState(43)
    distance = rng.uniform(100, 2500, n)
    weather = rng.randint(0, 5, n)       # 0=clear .. 4=storm
    traffic = rng.randint(0, 4, n)       # 0=low .. 3=severe
    hist_delay = rng.uniform(0, 0.5, n)

    prob = 1 / (1 + np.exp(-(
        -2.0
        + distance * 0.0005
        + weather * 0.6
        + traffic * 0.7
        + hist_delay * 3.0
        + rng.normal(0, 0.3, n)
    )))
    delayed = (prob > 0.5).astype(int)
    X = np.column_stack([distance, weather, traffic, hist_delay])
    return X, delayed, prob


class DelayPredictionModel:
    def __init__(self):
        self.scaler = StandardScaler()
        self.model = GradientBoostingClassifier(
            n_estimators=100, max_depth=4, learning_rate=0.1, random_state=43
        )
        self._train()

    def _train(self):
        X, y, _ = _generate_delay_data()
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)

    def predict(self, distance: float, weather: int, traffic: int, hist_delay: float) -> dict:
        X = np.array([[distance, weather, traffic, hist_delay]])
        X_scaled = self.scaler.transform(X)
        prob = float(self.model.predict_proba(X_scaled)[0][1])
        risk_score = int(prob * 100)
        risk_level = (
            "Critical" if risk_score >= 75 else
            "High" if risk_score >= 50 else
            "Medium" if risk_score >= 30 else
            "Low"
        )
        return {"risk_score": risk_score, "risk_level": risk_level, "delay_probability": round(prob, 3)}


# ─── Logistics Maturity Scoring ────────────────────────────────────────────────

class MaturityScorer:
    """
    Score based on fleet_size, digital_adoption (0-1), network_complexity (1-10).
    """

    @staticmethod
    def score(fleet_size: int, digital_adoption: float, network_complexity: int) -> dict:
        base = 20
        if fleet_size > 500:
            base += 25
        elif fleet_size > 100:
            base += 15
        elif fleet_size > 20:
            base += 8

        base += digital_adoption * 30
        base += min(network_complexity, 10) * 2.5
        score = min(int(base), 100)

        level = "Advanced" if score >= 75 else "Intermediate" if score >= 45 else "Developing"

        suggestions = []
        if digital_adoption < 0.5:
            suggestions.append("Invest in digital logistics tools (TMS, GPS tracking)")
        if fleet_size < 100:
            suggestions.append("Consider partnerships to expand fleet capacity")
        if network_complexity < 5:
            suggestions.append("Explore multi-modal transport options for better coverage")
        if score < 60:
            suggestions.append("Implement real-time visibility and automated alerts")
        else:
            suggestions.append("Deploy predictive analytics for demand forecasting")

        return {"score": score, "level": level, "suggestions": suggestions}
