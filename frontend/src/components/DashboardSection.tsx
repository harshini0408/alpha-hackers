'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

/* ─── Types for API data ─── */
interface DashboardData {
  demand: {
    data: { name: string; demand: number; capacity: number }[];
    current_demand: number;
    current_capacity: number;
    capacity_gap_pct: number;
  };
  routes: { route: string; score: number }[];
  cost_index: { name: string; index: number }[];
  heatmap: { rows: string[]; cols: string[]; data: number[][] };
  risk: { label: string; level: string; color: string; pct: number }[];
  timestamp: string;
}

const tabs = ['Demand', 'Routes', 'Cost Index', 'Risk'];

export default function DashboardSection() {
  const [activeTab, setActiveTab] = useState('Demand');
  const [data, setData] = useState<DashboardData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard');
      const json = await res.json();
      setData(json);
      setLastUpdate(new Date(json.timestamp).toLocaleTimeString());
    } catch { /* silently retry on next interval */ }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [fetchData]);

  // Fallback data while API loads
  const demandData = data?.demand.data ?? [];
  const routePerf = data?.routes ?? [];
  const costIndex = data?.cost_index ?? [];
  const heatRows = data?.heatmap.rows ?? [];
  const heatCols = data?.heatmap.cols ?? [];
  const heatmapData = data?.heatmap.data ?? [];
  const riskIndicators = data?.risk ?? [];

  return (
    <section id="dashboard" className="section-padding section-alt">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">Live Intelligence</div>
          <h2 className="section-title mb-4">Logistics Intelligence Dashboard</h2>
          <p className="section-subtitle mx-auto">Real-time visibility into freight demand, route performance, and risk indicators.</p>
        </div>

        {/* Dashboard card */}
        <div className="card overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-neutral-100 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-cyan text-deep-blue'
                    : 'border-transparent text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="ml-auto flex items-center pr-4 gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-neutral-400">Live{lastUpdate ? ` · ${lastUpdate}` : ''}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'Demand' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="flex flex-wrap gap-8 mb-6">
                  <div><div className="text-2xl font-bold text-deep-blue">{data?.demand.current_demand?.toLocaleString() ?? '—'}</div><div className="text-xs text-neutral-400">Current Demand (loads)</div></div>
                  <div><div className="text-2xl font-bold text-cyan">{data?.demand.current_capacity?.toLocaleString() ?? '—'}</div><div className="text-xs text-neutral-400">Available Capacity</div></div>
                  <div><div className="text-2xl font-bold text-red-400">{data?.demand.capacity_gap_pct ?? '—'}%</div><div className="text-xs text-neutral-400">Capacity Gap</div></div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={demandData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="capacity" stroke="#E2E8F0" fill="#F8FAFC" strokeWidth={2} />
                      <Area type="monotone" dataKey="demand" stroke="#00B4D8" fill="#E8F8FC" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                {/* Heatmap */}
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-deep-blue mb-3">Freight Demand Heatmap</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr>
                          <th className="py-2 pr-3 text-left text-neutral-400 font-medium">Region</th>
                          {heatCols.map((c) => (
                            <th key={c} className="py-2 px-2 text-center text-neutral-400 font-medium">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {heatmapData.map((row, ri) => (
                          <tr key={ri}>
                            <td className="py-1.5 pr-3 text-neutral-600 font-medium">{heatRows[ri]}</td>
                            {row.map((val, ci) => (
                              <td key={ci} className="py-1.5 px-2">
                                <div
                                  className="w-full h-8 rounded flex items-center justify-center text-white font-semibold"
                                  style={{ backgroundColor: `rgba(0, 180, 216, ${val / 10})` }}
                                >
                                  {val > 5 ? val : ''}
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Routes' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h4 className="text-sm font-semibold text-deep-blue mb-4">Route Performance Score</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={routePerf} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                      <YAxis dataKey="route" type="category" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} width={80} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#00B4D8" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeTab === 'Cost Index' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="flex items-baseline gap-3 mb-6">
                  <div className="text-2xl font-bold text-deep-blue">110</div>
                  <div className="text-sm text-red-400 font-medium">+10% vs baseline</div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={costIndex}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} domain={[90, 120]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="index" stroke="#0A2540" fill="#0A2540" fillOpacity={0.05} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeTab === 'Risk' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h4 className="text-sm font-semibold text-deep-blue mb-6">Delivery Risk Indicators</h4>
                <div className="space-y-5">
                  {riskIndicators.map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-neutral-600">{r.label}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          r.level === 'High' ? 'bg-red-50 text-red-500' :
                          r.level === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                          'bg-green-50 text-green-600'
                        }`}>{r.level}</span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${r.pct}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full rounded-full ${r.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
