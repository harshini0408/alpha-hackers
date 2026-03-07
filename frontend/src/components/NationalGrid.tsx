'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Grid nodes (Indian logistics hubs) ─── */
const hubs = [
  { id: 'del', name: 'Delhi NCR', x: 220, y: 80, type: 'mega' as const },
  { id: 'mum', name: 'Mumbai', x: 115, y: 240, type: 'mega' as const },
  { id: 'che', name: 'Chennai', x: 250, y: 360, type: 'mega' as const },
  { id: 'kol', name: 'Kolkata', x: 340, y: 175, type: 'mega' as const },
  { id: 'blr', name: 'Bengaluru', x: 210, y: 330, type: 'major' as const },
  { id: 'ahm', name: 'Ahmedabad', x: 110, y: 170, type: 'major' as const },
  { id: 'hyd', name: 'Hyderabad', x: 215, y: 275, type: 'major' as const },
  { id: 'pun', name: 'Pune', x: 150, y: 260, type: 'major' as const },
  { id: 'jai', name: 'Jaipur', x: 170, y: 110, type: 'minor' as const },
  { id: 'lko', name: 'Lucknow', x: 270, y: 110, type: 'minor' as const },
  { id: 'nag', name: 'Nagpur', x: 215, y: 215, type: 'minor' as const },
  { id: 'ind', name: 'Indore', x: 160, y: 195, type: 'minor' as const },
  { id: 'coc', name: 'Kochi', x: 185, y: 375, type: 'minor' as const },
  { id: 'guw', name: 'Guwahati', x: 390, y: 120, type: 'minor' as const },
  { id: 'viz', name: 'Vizag', x: 300, y: 275, type: 'minor' as const },
];

/* ─── Active freight corridors ─── */
const corridors = [
  { from: 'del', to: 'mum', volume: 'high' },
  { from: 'del', to: 'kol', volume: 'high' },
  { from: 'mum', to: 'blr', volume: 'high' },
  { from: 'mum', to: 'che', volume: 'medium' },
  { from: 'che', to: 'blr', volume: 'medium' },
  { from: 'del', to: 'jai', volume: 'medium' },
  { from: 'del', to: 'lko', volume: 'medium' },
  { from: 'ahm', to: 'mum', volume: 'high' },
  { from: 'ahm', to: 'del', volume: 'medium' },
  { from: 'hyd', to: 'che', volume: 'medium' },
  { from: 'hyd', to: 'blr', volume: 'medium' },
  { from: 'pun', to: 'mum', volume: 'high' },
  { from: 'pun', to: 'blr', volume: 'low' },
  { from: 'nag', to: 'del', volume: 'low' },
  { from: 'nag', to: 'mum', volume: 'low' },
  { from: 'ind', to: 'del', volume: 'low' },
  { from: 'kol', to: 'guw', volume: 'low' },
  { from: 'che', to: 'viz', volume: 'low' },
  { from: 'blr', to: 'coc', volume: 'medium' },
];

const getHub = (id: string) => hubs.find((h) => h.id === id)!;
const volumeWidth = { high: 2.5, medium: 1.5, low: 1 };
const volumeOpacity = { high: 0.5, medium: 0.3, low: 0.15 };

/* ─── Stats that animate ─── */
const gridStats = [
  { label: 'Cities Connected', value: 15, suffix: '' },
  { label: 'Active Freight Corridors', value: 80000, suffix: '+' },
  { label: 'Data Points / Day', value: 2.4, suffix: 'M' },
  { label: 'AI Optimizations', value: 12400, suffix: '' },
];

function AnimCounter({ end, suffix, inView }: { end: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(end / 35);
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(id); }
      else setCount(start);
    }, 35);
    return () => clearInterval(id);
  }, [end, inView]);

  return <>{count.toLocaleString()}{suffix}</>;
}

/* ─── How it works steps ─── */
const steps = [
  {
    num: '01',
    title: 'Connect Your Data',
    desc: 'Integrate ERPs, TMS, GPS, and IoT sensors. Our platform ingests data from 50+ source types in real-time.',
    icon: <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.07-9.07a4.5 4.5 0 00-6.364 0l-4.5 4.5a4.5 4.5 0 001.242 7.244" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  },
  {
    num: '02',
    title: 'AI Learns Your Network',
    desc: 'ML models analyze routes, carriers, costs, delays — building a digital twin of your logistics network.',
    icon: <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  },
  {
    num: '03',
    title: 'Optimize & Act',
    desc: 'Get real-time predictions, benchmark rates, detect anomalies, and automate logistics decisions.',
    icon: <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  },
  {
    num: '04',
    title: 'Scale Nationwide',
    desc: 'Your logistics data joins the National Logistics Grid — a shared intelligence layer that makes every route smarter.',
    icon: <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  },
];

export default function NationalGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeHub, setActiveHub] = useState<string | null>(null);

  return (
    <section className="section-padding section-alt relative overflow-hidden" ref={ref}>
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            National Logistics Grid
          </div>
          <h2 className="section-title mb-4">Building India&apos;s Logistics Intelligence Layer</h2>
          <p className="section-subtitle mx-auto">
            A connected network of 15+ logistics hubs, 80,000+ routes, and 2,200+ carriers — all powered by shared AI intelligence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Interactive map */}
          <div className="relative">
            <svg viewBox="0 0 460 440" className="w-full max-w-[480px] mx-auto" fill="none">
              {/* India outline */}
              <path
                d="M200 30 C220 25 260 35 280 55 C300 75 320 85 330 110 C340 135 345 160 340 185 C335 210 330 220 325 240 C320 260 310 280 295 300 C280 320 270 340 255 355 C240 370 230 380 220 390 C210 400 200 405 195 395 C190 385 185 370 175 355 C165 340 155 320 145 300 C135 280 120 265 115 245 C110 225 105 205 110 185 C115 165 120 145 130 125 C140 105 155 85 170 65 C185 45 190 35 200 30Z"
                fill="#F0FBFE" stroke="#00B4D8" strokeWidth="0.5" opacity="0.5"
              />

              {/* Corridors with animation */}
              {corridors.map((c, i) => {
                const from = getHub(c.from);
                const to = getHub(c.to);
                const isActive = activeHub === null || activeHub === c.from || activeHub === c.to;
                return (
                  <g key={i}>
                    <line
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke="#00B4D8"
                      strokeWidth={volumeWidth[c.volume as keyof typeof volumeWidth]}
                      opacity={isActive ? volumeOpacity[c.volume as keyof typeof volumeOpacity] : 0.05}
                      strokeDasharray={c.volume === 'high' ? 'none' : '4 3'}
                    />
                    {/* Flow particle */}
                    {isActive && c.volume !== 'low' && (
                      <circle r={c.volume === 'high' ? 2.5 : 1.5} fill="#00B4D8" opacity="0.7">
                        <animateMotion
                          dur={`${3 + i * 0.2}s`}
                          repeatCount="indefinite"
                          path={`M${from.x},${from.y} L${to.x},${to.y}`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Hub nodes */}
              {hubs.map((hub) => {
                const r = hub.type === 'mega' ? 6 : hub.type === 'major' ? 4.5 : 3;
                const isActive = activeHub === null || activeHub === hub.id;
                return (
                  <g
                    key={hub.id}
                    onMouseEnter={() => setActiveHub(hub.id)}
                    onMouseLeave={() => setActiveHub(null)}
                    className="cursor-pointer"
                    opacity={isActive ? 1 : 0.3}
                  >
                    {/* Pulse for mega hubs */}
                    {hub.type === 'mega' && (
                      <circle cx={hub.x} cy={hub.y} r={r + 4} fill="none" stroke="#00B4D8" strokeWidth="1" opacity="0">
                        <animate attributeName="r" values={`${r + 4};${r + 14}`} dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle cx={hub.x} cy={hub.y} r={r} fill={hub.type === 'mega' ? '#0A2540' : '#00B4D8'} />
                    <text
                      x={hub.x}
                      y={hub.y - r - 5}
                      textAnchor="middle"
                      className={`${hub.type === 'minor' ? 'text-[8px]' : 'text-[10px]'} font-medium`}
                      fill="#475569"
                    >
                      {hub.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-deep-blue" /> Mega Hub</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-cyan" /> Major Hub</span>
              <span className="flex items-center gap-1.5"><span className="w-8 h-0.5 bg-cyan opacity-50" /> High Volume</span>
              <span className="flex items-center gap-1.5"><span className="w-8 h-0.5 bg-cyan opacity-30" style={{ borderTop: '1px dashed #00B4D8' }} /> Medium</span>
            </div>
          </div>

          {/* How it works */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-deep-blue mb-2">How the Grid Works</h3>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="flex gap-4 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-cyan-light flex items-center justify-center text-cyan group-hover:bg-cyan group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">{step.icon}</svg>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-cyan tracking-wider">{step.num}</span>
                    <h4 className="text-sm font-semibold text-deep-blue">{step.title}</h4>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grid stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {gridStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center p-5 rounded-xl bg-white border border-neutral-100"
            >
              <div className="text-2xl md:text-3xl font-bold text-deep-blue tracking-tight">
                <AnimCounter end={s.value} suffix={s.suffix} inView={isInView} />
              </div>
              <div className="text-xs text-neutral-400 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
