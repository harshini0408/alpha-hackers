import { NextResponse } from 'next/server';

/**
 * Dashboard Data API — Simulated Real-Time Logistics Intelligence
 *
 * Generates dynamic dashboard data that changes based on current time,
 * simulating real-time freight demand, route performance, cost indices,
 * and risk indicators for the Indian logistics market.
 */

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export async function GET() {
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.getDay();
  const dayOfMonth = now.getDate();
  const month = now.getMonth();
  const minute = now.getMinutes();
  const baseSeed = dayOfMonth * 100 + hour;

  // ─── Demand vs Capacity (changes hourly) ─────────────────────────────────
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const demandData = months.map((name, i) => {
    const seasonFactor = [9, 10, 11, 0, 2, 3].includes(i) ? 1.25 : 1.0;
    const base = 3800 + i * 350;
    const demand = Math.round(base * seasonFactor + seededRandom(baseSeed + i * 7) * 800);
    const capacity = Math.round(demand * (0.85 + seededRandom(baseSeed + i * 13) * 0.25));
    return { name, demand, capacity };
  });

  // Current demand/capacity (real-time)
  const currentDemand = demandData[month].demand + Math.round(seededRandom(baseSeed + minute) * 200);
  const currentCapacity = demandData[month].capacity + Math.round(seededRandom(baseSeed + minute + 1) * 150);
  const capacityGap = Math.round(((currentDemand - currentCapacity) / currentDemand) * 1000) / 10;

  // ─── Route Performance (changes daily) ───────────────────────────────────
  const routePerf = [
    { route: 'DEL-MUM', baseScore: 91 },
    { route: 'MUM-BLR', baseScore: 86 },
    { route: 'DEL-KOL', baseScore: 76 },
    { route: 'CHN-HYD', baseScore: 94 },
    { route: 'BLR-CHN', baseScore: 82 },
    { route: 'AMD-DEL', baseScore: 89 },
    { route: 'PUN-MUM', baseScore: 96 },
    { route: 'JAI-DEL', baseScore: 93 },
  ].map((r, i) => ({
    route: r.route,
    score: Math.min(99, Math.max(60, r.baseScore + Math.round((seededRandom(baseSeed + i * 11) - 0.5) * 10))),
  }));

  // ─── Cost Index (changes every few hours) ────────────────────────────────
  const costIndex = Array.from({ length: 8 }, (_, i) => ({
    name: `W${i + 1}`,
    index: Math.round(95 + seededRandom(baseSeed + i * 3) * 25),
  }));

  // ─── Freight Demand Heatmap (changes daily) ─────────────────────────────
  const heatRows = ['North', 'West', 'South', 'East', 'Central'];
  const heatCols = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const heatmapData = heatRows.map((_, ri) =>
    heatCols.map((_, ci) => Math.round(1 + seededRandom(baseSeed + ri * 7 + ci * 3) * 9))
  );

  // ─── Risk Indicators (real-time) ─────────────────────────────────────────
  const weatherRisk = Math.round(20 + seededRandom(baseSeed + 77) * 50 + (month >= 6 && month <= 8 ? 15 : 0)); // monsoon boost
  const congestionRisk = Math.round(30 + seededRandom(baseSeed + 88) * 40 + (hour >= 8 && hour <= 10 ? 20 : 0) + (hour >= 17 && hour <= 19 ? 18 : 0));
  const carrierRisk = Math.round(10 + seededRandom(baseSeed + 99) * 35 + (dayOfWeek === 0 ? 15 : 0));
  const fuelRisk = Math.round(25 + seededRandom(baseSeed + 55) * 45);

  const toLevel = (pct: number) => pct >= 65 ? 'High' : pct >= 35 ? 'Medium' : 'Low';
  const toColor = (pct: number) => pct >= 65 ? 'bg-red-400' : pct >= 35 ? 'bg-yellow-400' : 'bg-green-400';

  const riskIndicators = [
    { label: 'Weather Disruption', level: toLevel(weatherRisk), color: toColor(weatherRisk), pct: Math.min(weatherRisk, 95) },
    { label: 'Route Congestion', level: toLevel(congestionRisk), color: toColor(congestionRisk), pct: Math.min(congestionRisk, 95) },
    { label: 'Carrier Availability', level: toLevel(carrierRisk), color: toColor(carrierRisk), pct: Math.min(carrierRisk, 95) },
    { label: 'Fuel Price Volatility', level: toLevel(fuelRisk), color: toColor(fuelRisk), pct: Math.min(fuelRisk, 95) },
  ];

  return NextResponse.json({
    timestamp: now.toISOString(),
    demand: {
      data: demandData,
      current_demand: currentDemand,
      current_capacity: currentCapacity,
      capacity_gap_pct: capacityGap,
    },
    routes: routePerf,
    cost_index: costIndex,
    heatmap: { rows: heatRows, cols: heatCols, data: heatmapData },
    risk: riskIndicators,
  });
}
