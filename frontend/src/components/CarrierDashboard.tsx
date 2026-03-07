'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* Carrier Dashboard — Available Shipments + AI Benchmark + Demand Heatmap */

const availableShipments = [
  { id: 'SH-4821', origin: 'Delhi', dest: 'Mumbai', weight: '12T', truck: '32ft MXL', posted: '2h ago', rate: 28400, aiRate: 26800, urgency: 'Normal' },
  { id: 'SH-4822', origin: 'Mumbai', dest: 'Chennai', weight: '8T', truck: '22ft Open', posted: '45m ago', rate: 24200, aiRate: 22100, urgency: 'Urgent' },
  { id: 'SH-4823', origin: 'Bengaluru', dest: 'Hyderabad', weight: '5T', truck: '14ft Canter', posted: '3h ago', rate: 11800, aiRate: 11200, urgency: 'Normal' },
  { id: 'SH-4824', origin: 'Ahmedabad', dest: 'Delhi', weight: '20T', truck: 'Trailer 40ft', posted: '1h ago', rate: 38500, aiRate: 35200, urgency: 'Express' },
  { id: 'SH-4825', origin: 'Pune', dest: 'Kolkata', weight: '15T', truck: '32ft MXL', posted: '30m ago', rate: 42100, aiRate: 39800, urgency: 'Normal' },
  { id: 'SH-4826', origin: 'Jaipur', dest: 'Lucknow', weight: '3T', truck: '14ft Canter', posted: '4h ago', rate: 9200, aiRate: 8900, urgency: 'Normal' },
];

const heatmapData = [
  { region: 'North', mon: 8, tue: 7, wed: 9, thu: 6, fri: 10, sat: 5 },
  { region: 'West', mon: 9, tue: 8, wed: 7, thu: 9, fri: 8, sat: 6 },
  { region: 'South', mon: 6, tue: 9, wed: 8, thu: 7, fri: 9, sat: 7 },
  { region: 'East', mon: 5, tue: 6, wed: 7, thu: 8, fri: 6, sat: 4 },
  { region: 'Central', mon: 7, tue: 5, wed: 6, thu: 7, fri: 7, sat: 3 },
];

const suggestedRoutes = [
  { route: 'Delhi → Mumbai', demand: 'High', aiRate: '₹26,800', profitMargin: '+14%', reason: 'High volume, return load availability' },
  { route: 'Mumbai → Pune', demand: 'Very High', aiRate: '₹4,200', profitMargin: '+22%', reason: 'Short haul, high frequency' },
  { route: 'Ahmedabad → Delhi', demand: 'Medium', aiRate: '₹18,900', profitMargin: '+11%', reason: 'Festive season demand' },
];

function HeatCell({ value }: { value: number }) {
  const intensity = Math.min(value / 10, 1);
  return (
    <div
      className="w-full h-8 rounded flex items-center justify-center text-xs font-medium"
      style={{
        backgroundColor: `rgba(0, 180, 216, ${intensity * 0.6 + 0.05})`,
        color: intensity > 0.5 ? 'white' : '#0A2540',
      }}
    >
      {value}
    </div>
  );
}

export default function CarrierDashboard() {
  const [tab, setTab] = useState<'shipments' | 'heatmap' | 'routes'>('shipments');
  const [clock, setClock] = useState('');

  useEffect(() => {
    const update = () => setClock(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="carrier-dashboard" className="section-padding section-alt">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-10">
          <div className="badge mx-auto mb-4">For Carriers & Transporters</div>
          <h2 className="section-title mb-4">Carrier Intelligence Dashboard</h2>
          <p className="section-subtitle mx-auto">
            Find profitable loads, benchmark rates with AI, and discover high-demand corridors — all in one view.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Dashboard chrome */}
          <div className="card overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 bg-deep-blue text-white">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm font-medium">LoRRI — Carrier Portal</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live · {clock}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-neutral-100 px-6">
              {[
                { key: 'shipments' as const, label: 'Available Shipments', count: availableShipments.length },
                { key: 'heatmap' as const, label: 'Demand Heatmap' },
                { key: 'routes' as const, label: 'AI Suggested Routes' },
              ].map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${tab === t.key ? 'border-cyan text-deep-blue' : 'border-transparent text-neutral-400 hover:text-neutral-600'}`}>
                  {t.label}
                  {t.count && <span className="ml-1.5 text-[10px] bg-cyan/10 text-cyan px-1.5 py-0.5 rounded-full">{t.count}</span>}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* Available Shipments */}
              {tab === 'shipments' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-neutral-400 uppercase tracking-wider border-b border-neutral-100">
                        <th className="pb-3 text-left font-medium">Shipment</th>
                        <th className="pb-3 text-left font-medium">Route</th>
                        <th className="pb-3 text-left font-medium">Weight</th>
                        <th className="pb-3 text-left font-medium">Truck</th>
                        <th className="pb-3 text-right font-medium">Quoted Rate</th>
                        <th className="pb-3 text-right font-medium">AI Benchmark</th>
                        <th className="pb-3 text-center font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availableShipments.map((s, i) => {
                        const delta = ((s.rate - s.aiRate) / s.aiRate * 100).toFixed(0);
                        const isAbove = s.rate > s.aiRate;
                        return (
                          <motion.tr key={s.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-b border-neutral-50 hover:bg-soft-grey/50 transition-colors">
                            <td className="py-3 font-mono text-xs text-neutral-500">{s.id}</td>
                            <td className="py-3 font-medium text-deep-blue">{s.origin} → {s.dest}</td>
                            <td className="py-3 text-neutral-600">{s.weight}</td>
                            <td className="py-3 text-neutral-500 text-xs">{s.truck}</td>
                            <td className="py-3 text-right font-semibold text-deep-blue">₹{s.rate.toLocaleString()}</td>
                            <td className="py-3 text-right">
                              <span className="font-medium text-neutral-600">₹{s.aiRate.toLocaleString()}</span>
                              <span className={`ml-1 text-[10px] font-bold ${isAbove ? 'text-green-600' : 'text-red-600'}`}>
                                {isAbove ? '+' : ''}{delta}%
                              </span>
                            </td>
                            <td className="py-3 text-center">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                s.urgency === 'Express' ? 'bg-red-50 text-red-600' :
                                s.urgency === 'Urgent' ? 'bg-amber-50 text-amber-600' :
                                'bg-green-50 text-green-600'
                              }`}>{s.urgency}</span>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="mt-4 p-3 bg-cyan/5 rounded-lg border border-cyan/10">
                    <p className="text-xs text-neutral-500">
                      <span className="font-semibold text-cyan">💡 AI insight:</span> Rates above AI benchmark (+%) are premium — higher profit margin. SH-4822 (Mumbai→Chennai, Urgent) offers best margin opportunity.
                    </p>
                  </div>
                </div>
              )}

              {/* Demand Heatmap */}
              {tab === 'heatmap' && (
                <div>
                  <p className="text-sm text-neutral-500 mb-4">Freight demand intensity by region and day — find high-demand corridors.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-xs text-neutral-400 font-medium pb-2 text-left w-24">Region</th>
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                            <th key={d} className="text-xs text-neutral-400 font-medium pb-2 text-center">{d}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {heatmapData.map(row => (
                          <tr key={row.region}>
                            <td className="py-1 text-sm font-medium text-deep-blue">{row.region}</td>
                            {[row.mon, row.tue, row.wed, row.thu, row.fri, row.sat].map((v, i) => (
                              <td key={i} className="py-1 px-1"><HeatCell value={v} /></td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-neutral-400">
                    <span>Low demand</span>
                    <div className="flex gap-0.5">
                      {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6].map((o, i) => (
                        <div key={i} className="w-6 h-3 rounded" style={{ backgroundColor: `rgba(0, 180, 216, ${o})` }} />
                      ))}
                    </div>
                    <span>High demand</span>
                  </div>
                </div>
              )}

              {/* AI Suggested Routes */}
              {tab === 'routes' && (
                <div className="space-y-4">
                  <p className="text-sm text-neutral-500 mb-2">AI-recommended routes based on current demand, profitability, and return load availability.</p>
                  {suggestedRoutes.map((r, i) => (
                    <motion.div key={r.route}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-4 bg-soft-grey rounded-xl hover:shadow-sm transition-shadow">
                      <div className="flex-1">
                        <div className="font-semibold text-deep-blue text-sm">{r.route}</div>
                        <div className="text-xs text-neutral-400 mt-0.5">{r.reason}</div>
                      </div>
                      <div className="text-center px-4">
                        <div className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          r.demand === 'Very High' ? 'bg-red-50 text-red-600' :
                          r.demand === 'High' ? 'bg-amber-50 text-amber-600' :
                          'bg-green-50 text-green-600'
                        }`}>{r.demand} demand</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-deep-blue">{r.aiRate}</div>
                        <div className="text-xs font-bold text-green-600">{r.profitMargin} margin</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}