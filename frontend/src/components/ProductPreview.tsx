'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Product screens to showcase ─── */
const screens = [
  {
    id: 'dashboard',
    label: 'Intelligence Dashboard',
    desc: 'Real-time visibility into freight demand, route performance, cost trends, and delivery risk — all in one AI-powered dashboard.',
    features: ['Live demand & capacity tracking', 'Route performance scoring', 'Cost index monitoring', 'Risk indicator alerts'],
    visual: 'dashboard',
  },
  {
    id: 'benchmark',
    label: 'Freight Benchmarking',
    desc: 'Compare your freight rates against market benchmarks across 80,000+ routes. AI predicts optimal rates using ML trained on billions of data points.',
    features: ['AI-predicted benchmark rates', 'Carrier availability insights', 'Market trend analysis', 'Savings opportunity finder'],
    visual: 'benchmark',
  },
  {
    id: 'prediction',
    label: 'Delay Prediction',
    desc: 'AI predicts delivery delays before they happen — factoring in weather, traffic, route history, and 50+ variables in real-time.',
    features: ['Risk score with confidence %', 'Contributing factor analysis', 'Proactive alert system', 'AI-powered recommendations'],
    visual: 'prediction',
  },
  {
    id: 'optimization',
    label: 'Route Optimization',
    desc: 'Constraint-based solvers find the optimal route, carrier, and load combination — minimizing cost while meeting delivery SLAs.',
    features: ['Multi-stop optimization', 'Load consolidation AI', 'Carbon-efficient routing', 'Dynamic re-routing'],
    visual: 'optimization',
  },
];

/* ─── Mock UI screens rendered in SVG for visual preview ─── */
function DashboardPreview() {
  return (
    <div className="relative bg-white rounded-xl border border-neutral-200 shadow-lg overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-100 bg-neutral-50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="text-[10px] text-neutral-400 ml-2">LoRRI Platform — Intelligence Dashboard</span>
      </div>
      <div className="p-4">
        {/* Metrics row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { label: 'Active Loads', value: '2,847', color: 'bg-cyan/10 text-cyan' },
            { label: 'On-Time Rate', value: '94.2%', color: 'bg-green-50 text-green-600' },
            { label: 'Cost Index', value: '108.5', color: 'bg-yellow-50 text-yellow-600' },
            { label: 'Risk Score', value: 'Low', color: 'bg-blue-50 text-blue-600' },
          ].map((m) => (
            <div key={m.label} className={`p-2 rounded-lg ${m.color}`}>
              <div className="text-[9px] opacity-60">{m.label}</div>
              <div className="text-sm font-bold">{m.value}</div>
            </div>
          ))}
        </div>
        {/* Chart mock */}
        <div className="h-24 bg-gradient-to-t from-cyan/5 to-transparent rounded-lg border border-dashed border-neutral-200 flex items-end px-2 pb-1 gap-[3px]">
          {Array.from({ length: 24 }, (_, i) => {
            const h = 20 + Math.sin(i * 0.4) * 15 + (i > 18 ? 20 : 0);
            return <div key={i} className="flex-1 bg-cyan/40 rounded-t-sm transition-all hover:bg-cyan/70" style={{ height: `${h}%` }} />;
          })}
        </div>
        {/* Bottom row */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {['Route Performance', 'Carrier Score', 'Cost Trend'].map((t) => (
            <div key={t} className="p-2 rounded border border-neutral-100 bg-neutral-50">
              <div className="text-[8px] text-neutral-400">{t}</div>
              <div className="h-8 flex items-end gap-[2px]">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="flex-1 bg-deep-blue/20 rounded-t-sm" style={{ height: `${30 + Math.random() * 60}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BenchmarkPreview() {
  return (
    <div className="relative bg-white rounded-xl border border-neutral-200 shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-100 bg-neutral-50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="text-[10px] text-neutral-400 ml-2">LoRRI — Freight Benchmark Explorer</span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {['Delhi', 'Mumbai', '32ft MXL'].map((v) => (
            <div key={v} className="px-2 py-1.5 rounded border border-neutral-200 text-[10px] text-neutral-600 bg-neutral-50">{v}</div>
          ))}
        </div>
        <div className="text-center p-4 bg-cyan/5 rounded-lg mb-3">
          <div className="text-[9px] text-neutral-400">AI-Predicted Rate</div>
          <div className="text-2xl font-bold text-deep-blue">₹29,388</div>
          <div className="text-[9px] text-neutral-400">FreightNet v2.1 · 1,400 km</div>
        </div>
        <div className="h-3 bg-neutral-100 rounded-full relative mb-3">
          <div className="absolute h-full left-[10%] right-[10%] bg-gradient-to-r from-green-300 via-cyan to-red-300 rounded-full" />
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-deep-blue rounded-full border-2 border-white" style={{ left: '45%' }} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ l: 'Market Avg', v: '₹30,170' }, { l: 'Carriers', v: '42' }, { l: 'Trend', v: '↓ 3.2%' }].map((m) => (
            <div key={m.l} className="text-center p-2 bg-neutral-50 rounded">
              <div className="text-xs font-bold text-deep-blue">{m.v}</div>
              <div className="text-[8px] text-neutral-400">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PredictionPreview() {
  return (
    <div className="relative bg-white rounded-xl border border-neutral-200 shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-100 bg-neutral-50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="text-[10px] text-neutral-400 ml-2">LoRRI — Delay Prediction Engine</span>
      </div>
      <div className="p-4">
        <div className="text-center mb-3">
          <div className="w-16 h-16 mx-auto relative">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" stroke="#E2E8F0" strokeWidth="8" fill="none" />
              <circle cx="50" cy="50" r="40" stroke="#F97316" strokeWidth="8" fill="none" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * 0.38}`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-deep-blue">62</div>
          </div>
          <span className="text-[10px] px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full font-semibold">Medium Risk</span>
        </div>
        <div className="space-y-2">
          {[{ f: 'Weather Impact', w: 65 }, { f: 'Traffic Congestion', w: 45 }, { f: 'Route History', w: 30 }].map((x) => (
            <div key={x.f}>
              <div className="flex justify-between text-[9px] mb-0.5"><span className="text-neutral-500">{x.f}</span><span className="text-neutral-400">{x.w}%</span></div>
              <div className="h-1.5 bg-neutral-100 rounded-full"><div className="h-full bg-cyan rounded-full" style={{ width: `${x.w}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="mt-3 p-2 bg-cyan/5 rounded border border-cyan/10 text-[9px] text-deep-blue">
          <span className="font-semibold text-cyan">AI Recommendation:</span> Consider early dispatch window 4-6 AM to avoid peak congestion zone.
        </div>
      </div>
    </div>
  );
}

function OptimizationPreview() {
  return (
    <div className="relative bg-white rounded-xl border border-neutral-200 shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-100 bg-neutral-50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="text-[10px] text-neutral-400 ml-2">LoRRI — Route Optimization</span>
      </div>
      <div className="p-4">
        <div className="flex gap-3 mb-3">
          <div className="flex-1 p-2 rounded bg-green-50 border border-green-100">
            <div className="text-[9px] text-green-600">Optimized</div>
            <div className="text-sm font-bold text-green-700">₹24,200</div>
            <div className="text-[8px] text-green-500">-18% vs current</div>
          </div>
          <div className="flex-1 p-2 rounded bg-neutral-50 border border-neutral-100">
            <div className="text-[9px] text-neutral-400">Current</div>
            <div className="text-sm font-bold text-neutral-600">₹29,500</div>
            <div className="text-[8px] text-neutral-400">16 hrs transit</div>
          </div>
        </div>
        {/* Route visualization */}
        <div className="h-20 rounded-lg bg-neutral-50 border border-dashed border-neutral-200 relative p-2">
          <svg viewBox="0 0 200 60" className="w-full h-full">
            <path d="M10 50 C50 50 60 10 100 10 C140 10 150 50 190 50" stroke="#E2E8F0" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            <path d="M10 50 C30 50 50 30 100 25 C150 20 170 40 190 50" stroke="#00B4D8" strokeWidth="2" fill="none" />
            <circle cx="10" cy="50" r="4" fill="#0A2540" />
            <circle cx="100" cy="25" r="3" fill="#00B4D8" />
            <circle cx="190" cy="50" r="4" fill="#0A2540" />
            <text x="10" y="46" fontSize="6" fill="#94A3B8">DEL</text>
            <text x="94" y="21" fontSize="6" fill="#94A3B8">NAG</text>
            <text x="182" y="46" fontSize="6" fill="#94A3B8">MUM</text>
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-2">
          {[{ l: 'Distance', v: '1,180 km' }, { l: 'Transit', v: '14 hrs' }, { l: 'CO₂ Saved', v: '12 kg' }].map((m) => (
            <div key={m.l} className="text-center p-1.5 bg-neutral-50 rounded">
              <div className="text-[10px] font-bold text-deep-blue">{m.v}</div>
              <div className="text-[7px] text-neutral-400">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const visuals: Record<string, React.ReactNode> = {
  dashboard: <DashboardPreview />,
  benchmark: <BenchmarkPreview />,
  prediction: <PredictionPreview />,
  optimization: <OptimizationPreview />,
};

export default function ProductPreview() {
  const [active, setActive] = useState(screens[0].id);
  const current = screens.find((s) => s.id === active)!;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50/50 to-white pointer-events-none" />

      <div className="relative max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">Product Experience</div>
          <h2 className="section-title mb-4">See What LoRRI Looks Like Inside</h2>
          <p className="section-subtitle mx-auto">
            Not just promises — see real platform screens, live AI predictions, and interactive dashboards.
          </p>
        </div>

        {/* Screen tabs */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto hide-scrollbar">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                active === s.id
                  ? 'bg-deep-blue text-white shadow-md'
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-deep-blue'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Preview content */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Product visual */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan/10 via-transparent to-cyan/5 rounded-2xl blur-xl pointer-events-none" />
              <div className="relative">{visuals[current.visual]}</div>
            </motion.div>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-deep-blue mb-3">{current.label}</h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">{current.desc}</p>

              <div className="space-y-3 mb-8">
                {current.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={`#${current.id === 'dashboard' ? 'dashboard' : current.id === 'benchmark' ? 'benchmark' : current.id === 'prediction' ? 'delay-prediction' : 'benchmark'}`} className="btn-primary">
                  Try it Live
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a href="#contact" className="btn-secondary">Schedule Demo</a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
