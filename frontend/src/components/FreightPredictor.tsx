'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bengaluru', 'Ahmedabad', 'Hyderabad', 'Pune', 'Jaipur', 'Lucknow'];
const truckTypes = ['14ft Canter', '22ft Open', '20ft Container', '32ft MXL', 'Trailer 40ft'];
const weightPresets = [
  { label: '1 Ton', value: 1000 },
  { label: '5 Tons', value: 5000 },
  { label: '10 Tons', value: 10000 },
  { label: '20 Tons', value: 20000 },
];

interface PredictionResult {
  prediction: { freight_rate: number; confidence_low: number; confidence_high: number; model: string };
  delivery: { estimated_hours: number; distance_km: number; avg_speed_kmh: number };
  risk: { delay_score: number; delay_risk: string; route_risks: string[] };
  optimization: { market_rate: number; ai_optimized_rate: number; savings: number; savings_pct: number };
  explainability: { feature_importance: { feature: string; impact: number; value: string }[]; model_type: string; training_data: string; accuracy: string };
  recommendation: string;
}

export default function FreightPredictor() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [truckType, setTruckType] = useState('');
  const [weight, setWeight] = useState(5000);
  const [fuelDelta, setFuelDelta] = useState(0);
  const [demandDelta, setDemandDelta] = useState(0);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'prediction' | 'explain' | 'scenario'>('prediction');

  const predict = async (fd = fuelDelta, dd = demandDelta) => {
    if (!origin || !destination || !truckType || origin === destination) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/predict/freight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination, truckType, weight, fuelDelta: fd, demandDelta: dd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Prediction failed');
      setResult(data);
      setActiveTab('prediction');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  const riskColor = (risk: string) =>
    risk === 'High' ? 'text-red-600 bg-red-50' : risk === 'Medium' ? 'text-amber-600 bg-amber-50' : 'text-green-600 bg-green-50';

  return (
    <section id="freight-predictor" className="section-padding">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-10">
          <div className="badge mx-auto mb-4">Live AI Prediction</div>
          <h2 className="section-title mb-4">AI Freight Intelligence</h2>
          <p className="section-subtitle mx-auto">
            Get real-time freight rate predictions, delay risk analysis, route optimization, and explainable AI — all powered by our ML models trained on 125K+ Indian routes.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Input Form */}
          <div className="card p-6 md:p-8 mb-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-deep-blue block mb-1.5">Origin</label>
                <select value={origin} onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none">
                  <option value="">Select city</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-deep-blue block mb-1.5">Destination</label>
                <select value={destination} onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none">
                  <option value="">Select city</option>
                  {cities.filter(c => c !== origin).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-deep-blue block mb-1.5">Truck Type</label>
                <select value={truckType} onChange={(e) => setTruckType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none">
                  <option value="">Select truck</option>
                  {truckTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-deep-blue block mb-1.5">Cargo Weight</label>
                <div className="flex gap-1.5">
                  {weightPresets.map(w => (
                    <button key={w.value} onClick={() => setWeight(w.value)}
                      className={`flex-1 px-1 py-2.5 text-xs font-medium rounded-lg border transition-all ${weight === w.value ? 'bg-deep-blue text-white border-deep-blue' : 'border-neutral-200 text-neutral-600 hover:border-cyan'}`}>
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => predict()} disabled={!origin || !destination || !truckType || origin === destination || loading}
              className="btn-primary w-full !py-3 disabled:opacity-40">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                  ML Model processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Predict Freight Rate
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                </span>
              )}
            </button>
          </div>

          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg mb-6">{error}</div>}

          {/* Results */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {/* Tab switcher */}
                <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg mb-6 max-w-md">
                  {[
                    { key: 'prediction' as const, label: 'Prediction & Risk' },
                    { key: 'explain' as const, label: 'AI Explainability' },
                    { key: 'scenario' as const, label: 'Scenario Simulation' },
                  ].map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${activeTab === tab.key ? 'bg-white text-deep-blue shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab: Prediction + Risk + Optimization */}
                {activeTab === 'prediction' && (
                  <div className="space-y-6">
                    {/* Main prediction card */}
                    <div className="card p-6 md:p-8">
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Predicted rate */}
                        <div className="text-center md:text-left">
                          <div className="inline-block px-2 py-0.5 bg-cyan/10 text-cyan text-[10px] font-semibold rounded-full mb-2">{result.prediction.model}</div>
                          <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">AI-Predicted Rate</div>
                          <div className="text-4xl font-bold text-deep-blue">₹{result.prediction.freight_rate.toLocaleString()}</div>
                          <div className="text-sm text-neutral-400 mt-1">{origin} → {destination} · {truckType}</div>
                          <div className="mt-2 text-xs text-neutral-500">
                            Confidence: ₹{result.prediction.confidence_low.toLocaleString()} — ₹{result.prediction.confidence_high.toLocaleString()}
                          </div>
                          {/* Confidence bar */}
                          <div className="mt-2 h-2 bg-neutral-100 rounded-full relative">
                            <div className="absolute h-full bg-gradient-to-r from-green-300 via-cyan to-amber-300 rounded-full" style={{ left: '10%', right: '10%' }} />
                            <div className="absolute w-2 h-4 bg-deep-blue rounded top-[-4px]" style={{ left: `${50 + (Math.random() - 0.5) * 10}%` }} />
                          </div>
                        </div>

                        {/* Delivery + Risk */}
                        <div className="space-y-3">
                          <div className="p-3 bg-soft-grey rounded-lg">
                            <div className="text-xs text-neutral-400 mb-0.5">Estimated Delivery</div>
                            <div className="text-xl font-bold text-deep-blue">{result.delivery.estimated_hours} hours</div>
                            <div className="text-xs text-neutral-400">{result.delivery.distance_km} km · Avg {result.delivery.avg_speed_kmh} km/h</div>
                          </div>
                          <div className="p-3 bg-soft-grey rounded-lg">
                            <div className="text-xs text-neutral-400 mb-0.5">Delay Risk</div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-deep-blue">{result.risk.delay_score}%</span>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${riskColor(result.risk.delay_risk)}`}>
                                {result.risk.delay_risk}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Optimization */}
                        <div className="p-4 bg-gradient-to-br from-cyan/5 to-deep-blue/5 rounded-xl border border-cyan/10">
                          <div className="text-xs font-semibold text-cyan uppercase tracking-wider mb-3">AI Route Optimization</div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-500">Market Rate</span>
                              <span className="font-medium text-neutral-400 line-through">₹{result.optimization.market_rate.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-500">AI Optimized</span>
                              <span className="font-bold text-deep-blue">₹{result.optimization.ai_optimized_rate.toLocaleString()}</span>
                            </div>
                            <div className="h-px bg-neutral-200 my-1" />
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-green-600">Savings</span>
                              <span className="font-bold text-green-600">₹{result.optimization.savings.toLocaleString()} ({result.optimization.savings_pct}%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decision Intelligence */}
                    <div className="card p-5 border-l-4 border-cyan">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-deep-blue uppercase tracking-wider mb-1">AI Recommendation</div>
                          <p className="text-sm text-neutral-600 leading-relaxed">{result.recommendation}</p>
                        </div>
                      </div>
                    </div>

                    {/* India-Specific Route Risks */}
                    {result.risk.route_risks.length > 0 && (
                      <div className="card p-5">
                        <div className="text-xs font-semibold text-deep-blue uppercase tracking-wider mb-3">
                          🇮🇳 India-Specific Route Intelligence
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {result.risk.route_risks.map((risk, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-neutral-600 p-2 bg-amber-50/50 rounded-lg">
                              <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                              </svg>
                              {risk}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Explainability */}
                {activeTab === 'explain' && (
                  <div className="card p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-deep-blue/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-deep-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-deep-blue">Explainable AI — Feature Importance</h3>
                        <p className="text-xs text-neutral-400">Why did the model predict ₹{result.prediction.freight_rate.toLocaleString()}?</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      {result.explainability.feature_importance.map((f, i) => (
                        <div key={f.feature} className="flex items-center gap-3">
                          <div className="w-24 text-sm font-medium text-neutral-700 text-right flex-shrink-0">{f.feature}</div>
                          <div className="flex-1 relative">
                            <div className="h-7 bg-neutral-50 rounded-md overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${f.impact}%` }}
                                transition={{ duration: 0.6, delay: i * 0.08 }}
                                className={`h-full rounded-md flex items-center px-2 ${i === 0 ? 'bg-cyan/80' : i === 1 ? 'bg-cyan/60' : 'bg-cyan/30'}`}
                              >
                                <span className="text-xs font-bold text-deep-blue">{f.impact}%</span>
                              </motion.div>
                            </div>
                          </div>
                          <div className="w-32 text-xs text-neutral-400 flex-shrink-0">{f.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 p-4 bg-soft-grey rounded-xl">
                      <div className="text-center">
                        <div className="text-xs text-neutral-400 mb-1">Model Type</div>
                        <div className="text-xs font-semibold text-deep-blue">{result.explainability.model_type}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-neutral-400 mb-1">Training Data</div>
                        <div className="text-xs font-semibold text-deep-blue">{result.explainability.training_data}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-neutral-400 mb-1">Accuracy</div>
                        <div className="text-xs font-semibold text-green-600">{result.explainability.accuracy}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Scenario Simulation */}
                {activeTab === 'scenario' && (
                  <div className="card p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-deep-blue mb-2">Scenario Simulation</h3>
                    <p className="text-sm text-neutral-500 mb-6">See how freight rates change when market conditions shift.</p>

                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="text-sm font-medium text-deep-blue block mb-2">
                          Fuel Price Change: <span className={`font-bold ${fuelDelta > 0 ? 'text-red-600' : fuelDelta < 0 ? 'text-green-600' : 'text-neutral-600'}`}>{fuelDelta > 0 ? '+' : ''}{fuelDelta}%</span>
                        </label>
                        <input type="range" min={-20} max={30} step={5} value={fuelDelta}
                          onChange={(e) => setFuelDelta(Number(e.target.value))}
                          className="w-full accent-cyan" />
                        <div className="flex justify-between text-xs text-neutral-400 mt-1">
                          <span>-20%</span><span>0%</span><span>+30%</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-deep-blue block mb-2">
                          Demand Spike: <span className={`font-bold ${demandDelta > 0 ? 'text-red-600' : demandDelta < 0 ? 'text-green-600' : 'text-neutral-600'}`}>{demandDelta > 0 ? '+' : ''}{demandDelta}%</span>
                        </label>
                        <input type="range" min={-20} max={40} step={5} value={demandDelta}
                          onChange={(e) => setDemandDelta(Number(e.target.value))}
                          className="w-full accent-cyan" />
                        <div className="flex justify-between text-xs text-neutral-400 mt-1">
                          <span>-20%</span><span>0%</span><span>+40%</span>
                        </div>
                      </div>
                    </div>

                    <button onClick={() => predict(fuelDelta, demandDelta)} disabled={loading}
                      className="btn-primary !py-2.5 mb-6 disabled:opacity-40">
                      {loading ? 'Simulating...' : 'Run Scenario'}
                    </button>

                    {/* Scenario comparison */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-soft-grey rounded-xl text-center">
                        <div className="text-xs text-neutral-400 mb-1">Base Rate</div>
                        <div className="text-2xl font-bold text-deep-blue">₹{result.prediction.freight_rate.toLocaleString()}</div>
                      </div>
                      <div className="p-4 bg-soft-grey rounded-xl text-center">
                        <div className="text-xs text-neutral-400 mb-1">Market Rate</div>
                        <div className="text-2xl font-bold text-neutral-400">₹{result.optimization.market_rate.toLocaleString()}</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl text-center">
                        <div className="text-xs text-green-600 mb-1">AI-Optimized</div>
                        <div className="text-2xl font-bold text-green-700">₹{result.optimization.ai_optimized_rate.toLocaleString()}</div>
                        <div className="text-xs text-green-600 font-medium mt-1">Save ₹{result.optimization.savings.toLocaleString()}</div>
                      </div>
                    </div>

                    {(fuelDelta !== 0 || demandDelta !== 0) && (
                      <div className="mt-4 p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
                        💡 With fuel {fuelDelta > 0 ? `+${fuelDelta}%` : `${fuelDelta}%`} and demand {demandDelta > 0 ? `+${demandDelta}%` : `${demandDelta}%`},
                        the predicted rate adjusts to ₹{result.prediction.freight_rate.toLocaleString()}.
                        {fuelDelta > 10 && ' Consider locking rates with advance bookings.'}
                        {demandDelta > 20 && ' High demand alert — book capacity early.'}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}