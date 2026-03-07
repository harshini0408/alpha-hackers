'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const origins = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bengaluru', 'Ahmedabad', 'Hyderabad', 'Pune', 'Jaipur', 'Lucknow'];
const truckTypes = ['20ft Container', '32ft MXL', '22ft Open', '14ft Canter', 'Trailer 40ft'];

interface BenchmarkResult {
  rate: number;
  marketAvg: number;
  low: number;
  high: number;
  carriers: number;
  trend: 'up' | 'down' | 'stable';
  trendPct: number;
  distance?: number;
  model?: string;
}

export default function FreightBenchmark() {
  const [origin, setOrigin] = useState('');
  const [dest, setDest] = useState('');
  const [truck, setTruck] = useState('');
  const [result, setResult] = useState<BenchmarkResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExplore = async () => {
    if (!origin || !dest || !truck || origin === dest) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/predict/freight-rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination: dest, truckType: truck }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Prediction failed');
      setResult({
        rate: data.predicted_rate,
        marketAvg: data.market_avg,
        low: data.low,
        high: data.high,
        carriers: data.carriers,
        trend: data.trend,
        trendPct: data.trend_pct,
        distance: data.distance_km,
        model: data.model,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="benchmark" className="section-padding section-alt">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">Benchmark Explorer</div>
          <h2 className="section-title mb-4">Freight Benchmark Explorer</h2>
          <p className="section-subtitle mx-auto">Compare real-time freight rates, carrier availability, and market trends across lanes.</p>
        </div>

        <div className="max-w-3xl mx-auto card p-8">
          {/* Inputs */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-deep-blue block mb-2">Origin</label>
              <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none">
                <option value="">Select origin</option>
                {origins.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-deep-blue block mb-2">Destination</label>
              <select value={dest} onChange={(e) => setDest(e.target.value)} className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none">
                <option value="">Select destination</option>
                {origins.filter((o) => o !== origin).map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-deep-blue block mb-2">Truck Type</label>
              <select value={truck} onChange={(e) => setTruck(e.target.value)} className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none">
                <option value="">Select truck</option>
                {truckTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <button onClick={handleExplore} disabled={!origin || !dest || !truck || origin === dest || loading} className="btn-primary w-full !py-3 disabled:opacity-40">
            {loading ? 'AI Model predicting...' : 'Get Benchmark Rate'}
          </button>

          {error && <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

          {/* Results */}
          {result && !loading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
              {/* Rate card */}
              <div className="text-center p-6 bg-soft-grey rounded-xl">
                {result.model && <div className="inline-block px-2 py-0.5 bg-cyan/10 text-cyan text-[10px] font-semibold rounded-full mb-2">{result.model}</div>}
                <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">AI-Predicted Benchmark Rate</div>
                <div className="text-4xl font-bold text-deep-blue">₹{result.rate.toLocaleString()}</div>
                <div className="text-sm text-neutral-500 mt-1">{origin} → {dest} · {truck}{result.distance ? ` · ${result.distance} km` : ''}</div>
              </div>

              {/* Range bar */}
              <div>
                <div className="flex justify-between text-xs text-neutral-400 mb-2">
                  <span>₹{result.low.toLocaleString()}</span>
                  <span>Market Range</span>
                  <span>₹{result.high.toLocaleString()}</span>
                </div>
                <div className="relative h-3 bg-neutral-100 rounded-full">
                  <div className="absolute h-full bg-gradient-to-r from-green-300 via-cyan to-red-300 rounded-full" style={{ left: '5%', right: '5%' }} />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-deep-blue rounded-full border-2 border-white shadow-md"
                    style={{ left: `${((result.rate - result.low) / (result.high - result.low)) * 90 + 5}%` }}
                  />
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-soft-grey rounded-lg">
                  <div className="text-lg font-bold text-deep-blue">₹{result.marketAvg.toLocaleString()}</div>
                  <div className="text-xs text-neutral-400">Market Average</div>
                </div>
                <div className="text-center p-4 bg-soft-grey rounded-lg">
                  <div className="text-lg font-bold text-deep-blue">{result.carriers}</div>
                  <div className="text-xs text-neutral-400">Available Carriers</div>
                </div>
                <div className="text-center p-4 bg-soft-grey rounded-lg">
                  <div className={`text-lg font-bold flex items-center justify-center gap-1 ${
                    result.trend === 'up' ? 'text-red-500' : result.trend === 'down' ? 'text-green-500' : 'text-neutral-500'
                  }`}>
                    {result.trend === 'up' ? '↑' : result.trend === 'down' ? '↓' : '→'} {result.trendPct}%
                  </div>
                  <div className="text-xs text-neutral-400">Market Trend</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
