'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* ─── Animated counter ─── */
function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = Math.ceil(end / 40);
        const id = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(id); }
          else setCount(start);
        }, 30);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─── India logistics map ─── */
const cities = [
  { name: 'Delhi', x: 220, y: 95 },
  { name: 'Mumbai', x: 145, y: 230 },
  { name: 'Chennai', x: 235, y: 340 },
  { name: 'Kolkata', x: 315, y: 190 },
  { name: 'Bengaluru', x: 210, y: 320 },
  { name: 'Ahmedabad', x: 130, y: 175 },
  { name: 'Hyderabad', x: 215, y: 275 },
  { name: 'Pune', x: 165, y: 255 },
];

const corridors = [
  [0, 1], [0, 3], [1, 4], [1, 7], [2, 4], [3, 6], [5, 1], [6, 2], [5, 0], [7, 4],
];

function IndiaMap() {
  return (
    <svg viewBox="0 0 420 440" className="w-full h-full" fill="none">
      {/* India outline - simplified */}
      <path
        d="M200 30 C220 25 260 35 280 55 C300 75 320 85 330 110 C340 135 345 160 340 185 C335 210 330 220 325 240 C320 260 310 280 295 300 C280 320 270 340 255 355 C240 370 230 380 220 390 C210 400 200 405 195 395 C190 385 185 370 175 355 C165 340 155 320 145 300 C135 280 120 265 115 245 C110 225 105 205 110 185 C115 165 120 145 130 125 C140 105 155 85 170 65 C185 45 190 35 200 30Z"
        fill="#F8FAFC"
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />

      {/* Corridors */}
      {corridors.map(([a, b], i) => (
        <line
          key={i}
          x1={cities[a].x} y1={cities[a].y}
          x2={cities[b].x} y2={cities[b].y}
          stroke="#00B4D8"
          strokeWidth="1"
          opacity="0.25"
          strokeDasharray="4 4"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        </line>
      ))}

      {/* Flow particles */}
      {corridors.slice(0, 5).map(([a, b], i) => (
        <circle key={`p-${i}`} r="2.5" fill="#00B4D8" opacity="0.6">
          <animateMotion
            dur={`${3 + i * 0.5}s`}
            repeatCount="indefinite"
            path={`M${cities[a].x},${cities[a].y} L${cities[b].x},${cities[b].y}`}
          />
        </circle>
      ))}

      {/* Cities */}
      {cities.map((city, i) => (
        <g key={city.name}>
          <circle cx={city.x} cy={city.y} r="4" fill="#0A2540" />
          <circle cx={city.x} cy={city.y} r="7" fill="#00B4D8" opacity="0.15">
            <animate attributeName="r" values="7;12;7" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0.05;0.15" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <text x={city.x} y={city.y - 12} textAnchor="middle" className="fill-neutral-500 text-[10px] font-medium">
            {city.name}
          </text>
        </g>
      ))}

      {/* AI hub */}
      <g>
        <circle cx="220" cy="210" r="18" fill="#0A2540" opacity="0.06" />
        <circle cx="220" cy="210" r="12" fill="#0A2540" opacity="0.1" />
        <text x="220" y="214" textAnchor="middle" className="fill-deep-blue text-[9px] font-bold">AI</text>
      </g>
    </svg>
  );
}

/* ─── Logos ─── */
const logos = ['Manufacturing OEM', 'National FMCG Distributor', 'E-Commerce Fulfillment', 'Automotive Tier-1', 'Chemical Exporter', 'Retail Chain', 'Pharma Logistics', '3PL Enterprise'];

/* ─── Live AI stat ticker ─── */
function LiveTicker() {
  const stats = [
    { text: 'Delhi → Mumbai: ₹28,400 predicted', type: 'prediction' },
    { text: 'Route BLR-HYD: Low delay risk', type: 'low-risk' },
    { text: 'Carrier match: 42 available DEL-MUM', type: 'match' },
    { text: 'Route optimization saved ₹3.2L today', type: 'savings' },
    { text: 'AI processed 12,847 predictions today', type: 'prediction' },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % stats.length), 3000);
    return () => clearInterval(id);
  }, [stats.length]);

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-deep-blue/5 rounded-lg">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="text-xs font-medium text-deep-blue truncate"
      >
        {stats[idx].text}
      </motion.span>
    </div>
  );
}

/* ─── Main Hero ─── */
export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      {/* Gradient sweep */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="badge mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              AI-Powered Logistics Intelligence
            </div>

            <h1 className="text-[32px] md:text-[44px] lg:text-hero text-deep-blue mb-5 max-w-[560px] leading-[1.08] font-bold tracking-tight">
              Don&apos;t Just Read About AI.
              <br />
              <span className="text-cyan">Experience It Live.</span>
            </h1>

            <p className="text-base md:text-lg text-neutral-500 mb-6 max-w-[500px] leading-relaxed">
              LogisticsNow is building India&apos;s National Logistics Intelligence Grid — predict freight rates, detect delays, optimize routes, and make AI-driven decisions in real-time.
            </p>

            {/* Live AI ticker */}
            <div className="mb-6">
              <LiveTicker />
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#freight-predictor" className="btn-primary">
                Try AI Prediction Live
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </a>
              <a href="#simulator" className="btn-secondary">Simulate a Route</a>
              <a href="#contact" className="btn-ghost">Schedule Demo →</a>
            </div>

            {/* Metrics strip */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: 80000, suffix: '+', label: 'Routes Mapped' },
                { value: 2200, suffix: '+', label: 'Carriers Added' },
                { value: 2.5, suffix: 'B+', label: 'Spend Analysed (₹)' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-2xl md:text-3xl font-bold text-deep-blue tracking-tight">
                    <Counter end={m.value} suffix={m.suffix} />
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — India map + floating intelligence cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-[420px] mx-auto">
              <IndiaMap />
              {/* Floating intelligence cards */}
              <div className="absolute top-4 right-0 bg-white rounded-lg shadow-md border border-neutral-100 px-3 py-2 animate-float">
                <div className="text-[10px] text-neutral-400">Live Routes</div>
                <div className="text-sm font-bold text-deep-blue flex items-center gap-1">2,847 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /></div>
              </div>
              <div className="absolute top-1/3 right-0 bg-white rounded-lg shadow-md border border-green-100 px-3 py-2 animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-[10px] text-green-600 font-medium">AI Savings</div>
                <div className="text-sm font-bold text-green-700">₹3.2Cr<span className="text-[10px] text-green-400">/mo</span></div>
              </div>
              <div className="absolute bottom-28 left-0 bg-white rounded-lg shadow-md border border-cyan/20 px-3 py-2 animate-float" style={{ animationDelay: '2s' }}>
                <div className="text-[10px] text-neutral-400">ML Predictions</div>
                <div className="text-sm font-bold text-cyan">12.4K<span className="text-[10px] text-neutral-400">/day</span></div>
              </div>
              <div className="absolute bottom-12 right-4 bg-deep-blue rounded-lg shadow-md px-3 py-2 animate-float" style={{ animationDelay: '3s' }}>
                <div className="text-[10px] text-neutral-300">Delay Risk</div>
                <div className="text-sm font-bold text-green-400">Low ✓</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Logo strip */}
        <div className="mt-16 pt-10 border-t border-neutral-100">
          <p className="text-xs text-neutral-400 text-center mb-6 uppercase tracking-wider font-medium">Trusted across industries</p>
          <div className="relative overflow-hidden">
            <div className="flex gap-12 logo-scroll">
              {[...logos, ...logos].map((name, i) => (
                <span key={i} className="text-sm font-semibold text-neutral-300 whitespace-nowrap select-none">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
