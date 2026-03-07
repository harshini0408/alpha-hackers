'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── City coordinates for route visualization ─── */
const cityCoords: Record<string, { x: number; y: number }> = {
  Delhi: { x: 220, y: 80 },
  Mumbai: { x: 115, y: 240 },
  Chennai: { x: 250, y: 360 },
  Kolkata: { x: 340, y: 175 },
  Bengaluru: { x: 210, y: 320 },
  Ahmedabad: { x: 110, y: 170 },
  Hyderabad: { x: 215, y: 275 },
  Pune: { x: 150, y: 260 },
  Jaipur: { x: 170, y: 110 },
  Lucknow: { x: 270, y: 110 },
};

const cities = Object.keys(cityCoords);

/* ─── Waypoints for intermediate stops ─── */
const waypointMap: Record<string, string[]> = {
  'Delhi-Mumbai': ['Jaipur', 'Ahmedabad'],
  'Delhi-Bengaluru': ['Jaipur', 'Hyderabad'],
  'Delhi-Chennai': ['Lucknow', 'Hyderabad'],
  'Mumbai-Kolkata': ['Hyderabad'],
  'Mumbai-Chennai': ['Pune', 'Bengaluru'],
  'Kolkata-Chennai': ['Hyderabad'],
};

function getWaypoints(from: string, to: string): string[] {
  return waypointMap[`${from}-${to}`] || waypointMap[`${to}-${from}`] || [];
}

/* ─── SVG Path builder through waypoints ─── */
function buildRoutePath(from: string, to: string, waypoints: string[]): string {
  const allPoints = [from, ...waypoints, to].map((c) => cityCoords[c]);
  if (allPoints.length === 2) {
    const [a, b] = allPoints;
    const mx = (a.x + b.x) / 2 + (Math.random() - 0.5) * 30;
    const my = (a.y + b.y) / 2 + (Math.random() - 0.5) * 20;
    return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
  }
  let d = `M${allPoints[0].x},${allPoints[0].y}`;
  for (let i = 1; i < allPoints.length; i++) {
    d += ` L${allPoints[i].x},${allPoints[i].y}`;
  }
  return d;
}

/* ─── Simulated results ─── */
function simulateRoute(from: string, to: string) {
  const dx = cityCoords[from].x - cityCoords[to].x;
  const dy = cityCoords[from].y - cityCoords[to].y;
  const pixelDist = Math.sqrt(dx * dx + dy * dy);
  const distance = Math.round(pixelDist * 7.5);
  const baseRate = distance * 22 + 3000;
  const optimizedRate = Math.round(baseRate * 0.82);
  const transit = Math.round(distance / 55);
  const co2 = Math.round(distance * 0.12);
  const co2Saved = Math.round(co2 * 0.15);
  const waypoints = getWaypoints(from, to);

  return {
    distance, baseRate: Math.round(baseRate), optimizedRate, transit, co2, co2Saved, waypoints,
    savings: Math.round(((baseRate - optimizedRate) / baseRate) * 100),
    fuelCost: Math.round(distance * 3.8),
    tollCost: Math.round(distance * 1.2),
  };
}

export default function RouteSimulator() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState<ReturnType<typeof simulateRoute> | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleSimulate = useCallback(async () => {
    if (!origin || !destination || origin === destination) return;
    setAnimating(true);
    setResult(null);
    try {
      const res = await fetch('/api/predict/freight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination, truckType: 'open_body', weight: 10 }),
      });
      const data = await res.json();
      const distance = data.delivery?.distance_km ?? 0;
      const waypoints = getWaypoints(origin, destination);
      const co2 = Math.round(distance * 0.12);
      setResult({
        distance,
        baseRate: Math.round(data.optimization?.market_rate ?? 0),
        optimizedRate: Math.round(data.optimization?.ai_optimized_rate ?? 0),
        transit: Math.round(data.delivery?.estimated_hours ?? 0),
        co2,
        co2Saved: Math.round(co2 * 0.15),
        waypoints,
        savings: Math.round(data.optimization?.savings_pct ?? 0),
        fuelCost: Math.round(distance * 3.8),
        tollCost: Math.round(distance * 1.2),
      });
    } catch {
      setResult(simulateRoute(origin, destination));
    } finally {
      setAnimating(false);
    }
  }, [origin, destination]);

  const routePath = result ? buildRoutePath(origin, destination, result.waypoints) : '';
  const allRoutePoints = result ? [origin, ...result.waypoints, destination] : [];

  return (
    <section id="simulator" className="section-padding">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            Interactive Simulator
          </div>
          <h2 className="section-title mb-4">Simulate Your Logistics Route</h2>
          <p className="section-subtitle mx-auto">
            Pick an origin and destination to see AI-optimized routing, cost breakdown, and CO₂ savings in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Map visualization */}
          <div className="card p-6 relative">
            <svg viewBox="0 0 420 440" className="w-full max-w-[420px] mx-auto" fill="none">
              {/* India outline */}
              <path
                d="M200 30 C220 25 260 35 280 55 C300 75 320 85 330 110 C340 135 345 160 340 185 C335 210 330 220 325 240 C320 260 310 280 295 300 C280 320 270 340 255 355 C240 370 230 380 220 390 C210 400 200 405 195 395 C190 385 185 370 175 355 C165 340 155 320 145 300 C135 280 120 265 115 245 C110 225 105 205 110 185 C115 165 120 145 130 125 C140 105 155 85 170 65 C185 45 190 35 200 30Z"
                fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"
              />

              {/* All cities */}
              {cities.map((city) => {
                const c = cityCoords[city];
                const isOrigin = city === origin;
                const isDest = city === destination;
                const isWaypoint = result?.waypoints.includes(city);
                return (
                  <g key={city}>
                    <circle cx={c.x} cy={c.y} r={isOrigin || isDest ? 6 : 4}
                      fill={isOrigin ? '#0A2540' : isDest ? '#00B4D8' : isWaypoint ? '#F59E0B' : '#CBD5E1'} />
                    {(isOrigin || isDest) && (
                      <circle cx={c.x} cy={c.y} r="10" fill="none"
                        stroke={isOrigin ? '#0A2540' : '#00B4D8'} strokeWidth="1.5" opacity="0.3">
                        <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <text x={c.x} y={c.y - (isOrigin || isDest ? 12 : 8)} textAnchor="middle"
                      className={`${isOrigin || isDest ? 'text-[11px] font-semibold' : 'text-[9px]'}`}
                      fill={isOrigin ? '#0A2540' : isDest ? '#00B4D8' : '#94A3B8'}>
                      {city}
                    </text>
                  </g>
                );
              })}

              {/* Animated route path */}
              {result && (
                <>
                  <motion.path
                    d={routePath}
                    stroke="#00B4D8"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  {/* Truck particle */}
                  <circle r="4" fill="#0A2540">
                    <animateMotion dur="3s" repeatCount="indefinite" path={routePath} />
                  </circle>
                  {/* Route point labels */}
                  {allRoutePoints.map((p, i) => {
                    const c = cityCoords[p];
                    return (
                      <g key={`label-${p}`}>
                        {i > 0 && i < allRoutePoints.length - 1 && (
                          <text x={c.x} y={c.y + 16} textAnchor="middle" className="text-[8px]" fill="#F59E0B">Stop {i}</text>
                        )}
                      </g>
                    );
                  })}
                </>
              )}
            </svg>

            {animating && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-neutral-500">AI optimizing route...</span>
                </div>
              </div>
            )}
          </div>

          {/* Controls + Results */}
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-deep-blue mb-4">Route Configuration</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">Origin</label>
                  <select value={origin} onChange={(e) => { setOrigin(e.target.value); setResult(null); }}
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none">
                    <option value="">Select origin</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">Destination</label>
                  <select value={destination} onChange={(e) => { setDestination(e.target.value); setResult(null); }}
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none">
                    <option value="">Select destination</option>
                    {cities.filter((c) => c !== origin).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <button onClick={handleSimulate}
                  disabled={!origin || !destination || origin === destination || animating}
                  className="btn-primary w-full !py-2.5 disabled:opacity-40">
                  {animating ? 'Optimizing...' : 'Simulate Route'}
                </button>
              </div>
            </div>

            {/* Results card */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="card p-6 space-y-4"
                >
                  <h3 className="text-sm font-semibold text-deep-blue">AI Optimization Results</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-[10px] text-green-600 font-medium">Optimized Cost</div>
                      <div className="text-lg font-bold text-green-700">₹{result.optimizedRate.toLocaleString()}</div>
                      <div className="text-[10px] text-green-500">-{result.savings}% savings</div>
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <div className="text-[10px] text-neutral-400">Standard Cost</div>
                      <div className="text-lg font-bold text-neutral-500 line-through">₹{result.baseRate.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-soft-grey rounded-lg">
                      <div className="text-sm font-bold text-deep-blue">{result.distance.toLocaleString()}</div>
                      <div className="text-[9px] text-neutral-400">km</div>
                    </div>
                    <div className="text-center p-2 bg-soft-grey rounded-lg">
                      <div className="text-sm font-bold text-deep-blue">{result.transit}</div>
                      <div className="text-[9px] text-neutral-400">hrs transit</div>
                    </div>
                    <div className="text-center p-2 bg-soft-grey rounded-lg">
                      <div className="text-sm font-bold text-green-600">-{result.co2Saved} kg</div>
                      <div className="text-[9px] text-neutral-400">CO₂ saved</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-medium text-neutral-400 mb-2 uppercase tracking-wider">Cost Breakdown</div>
                    <div className="space-y-1.5">
                      {[
                        { label: 'Fuel', value: result.fuelCost, pct: Math.round((result.fuelCost / result.optimizedRate) * 100) },
                        { label: 'Tolls', value: result.tollCost, pct: Math.round((result.tollCost / result.optimizedRate) * 100) },
                        { label: 'Other', value: result.optimizedRate - result.fuelCost - result.tollCost, pct: 100 - Math.round((result.fuelCost / result.optimizedRate) * 100) - Math.round((result.tollCost / result.optimizedRate) * 100) },
                      ].map((c) => (
                        <div key={c.label}>
                          <div className="flex justify-between text-[10px] mb-0.5">
                            <span className="text-neutral-500">{c.label}</span>
                            <span className="text-neutral-400">₹{c.value.toLocaleString()} ({c.pct}%)</span>
                          </div>
                          <div className="h-1.5 bg-neutral-100 rounded-full">
                            <div className="h-full bg-cyan rounded-full" style={{ width: `${c.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.waypoints.length > 0 && (
                    <div className="pt-2 border-t border-neutral-100">
                      <div className="text-[10px] text-neutral-400 mb-1">Optimized Stops</div>
                      <div className="flex items-center gap-1 text-xs text-deep-blue">
                        <span className="font-semibold">{origin}</span>
                        {result.waypoints.map((w) => (
                          <span key={w} className="flex items-center gap-1">
                            <span className="text-neutral-300">→</span>
                            <span className="text-yellow-600">{w}</span>
                          </span>
                        ))}
                        <span className="text-neutral-300">→</span>
                        <span className="font-semibold text-cyan">{destination}</span>
                      </div>
                    </div>
                  )}

                  <a href="#contact" className="btn-secondary w-full text-center !text-xs">
                    Get Full Optimization Report →
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
