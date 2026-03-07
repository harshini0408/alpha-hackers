'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function AnimatedMetric({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(target / 30);
          const interval = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(interval); }
            else setCount(start);
          }, 40);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}>{prefix}{count.toLocaleString()}{suffix}</div>;
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="inline-block">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const metrics = [
  { label: 'Routes Mapped', value: 125, suffix: 'K+', trend: [20, 40, 60, 85, 105, 125], growth: '+48% this year' },
  { label: 'Freight Analysed', prefix: '₹', value: 230, suffix: ' Cr', trend: [30, 65, 110, 150, 190, 230], growth: '₹2.3B+ total' },
  { label: 'Forecast Accuracy', value: 92, suffix: '.8%', trend: [78, 82, 85, 88, 91, 92], growth: 'Industry best' },
  { label: 'Enterprise Clients', value: 12, suffix: '', trend: [2, 4, 6, 8, 10, 12], growth: '+5 this quarter' },
];

const infraStats = [
  { label: 'ML Models in Production', value: '14', icon: '🧠' },
  { label: 'Predictions Served/Day', value: '12.4K', icon: '⚡' },
  { label: 'Avg Response Time', value: '<180ms', icon: '🔄' },
  { label: 'Uptime SLA', value: '99.95%', icon: '🛡️' },
];

const milestones = [
  { year: '2023', event: 'Founded — Built first freight-rate prediction engine for Indian routes', tag: 'Inception' },
  { year: '2024', event: 'Launched LoRRI platform with AI benchmarking and delay prediction', tag: 'Product' },
  { year: '2025', event: 'Onboarded 12 enterprise clients across FMCG, auto, chemicals', tag: 'Traction' },
  { year: '2026', event: 'National Logistics Grid: 125K routes, 92.8% forecast accuracy', tag: 'Now' },
];

const competitiveEdge = [
  { moat: 'Proprietary Data Flywheel', desc: 'Every prediction improves the model — 125K+ routes worth of data compounds our accuracy advantage.' },
  { moat: 'National Logistics Grid', desc: 'India\'s first AI-mapped freight corridor network covering 15 hub cities and 19 active corridors.' },
  { moat: 'India-Specific Intelligence', desc: 'Monsoon risk, state border delays, highway congestion — factors no global tool captures.' },
  { moat: 'Full-Stack AI Platform', desc: 'Freight prediction, delay forecasting, route optimization, and carrier matching in one platform.' },
];

export default function EnterpriseSection() {
  return (
    <section className="section-padding section-alt relative overflow-hidden">
      <div className="relative max-w-content mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge mb-4">Platform Metrics</span>
          <h2 className="text-3xl md:text-4xl font-bold text-deep-blue tracking-tight mb-3">
            Built on data. Measured by impact.
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto">
            LogisticsNow is building the AI infrastructure layer for India&apos;s ₹31L Cr+ logistics market —
            with real predictions, real routes, and real enterprise traction.
          </p>
        </motion.div>

        {/* Growth metrics with sparklines */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl font-bold text-deep-blue tracking-tight mb-1">
                <AnimatedMetric target={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="text-xs text-neutral-400 mb-2">{m.label}</div>
              <div className="flex justify-center mb-2">
                <Sparkline data={m.trend} color="#00B4D8" />
              </div>
              <div className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5 inline-block">
                {m.growth}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infrastructure authority */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8 mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <h3 className="text-lg font-semibold text-deep-blue">Platform Infrastructure — Live</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {infraStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="text-center"
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-xl font-bold text-deep-blue">{s.value}</div>
                <div className="text-xs text-neutral-400 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Competitive moats + Milestones */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <h3 className="text-lg font-semibold text-deep-blue mb-6">Competitive Moats</h3>
            <div className="space-y-5">
              {competitiveEdge.map((c, i) => (
                <div key={c.moat} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-cyan">{i + 1}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-deep-blue">{c.moat}</div>
                    <div className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card p-8"
          >
            <h3 className="text-lg font-semibold text-deep-blue mb-6">Journey</h3>
            <div className="space-y-5 relative">
              <div className="absolute left-[23px] top-2 bottom-2 w-px bg-neutral-100" />
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="flex gap-4 relative"
                >
                  <div className={`w-[14px] h-[14px] rounded-full border-2 flex-shrink-0 mt-1 z-10 ${m.tag === 'Now' ? 'border-cyan bg-cyan' : 'border-neutral-300 bg-white'}`} />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-deep-blue">{m.year}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${m.tag === 'Now' ? 'bg-cyan/10 text-cyan' : 'bg-neutral-100 text-neutral-400'}`}>{m.tag}</span>
                    </div>
                    <div className="text-sm text-neutral-500 leading-relaxed">{m.event}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Market opportunity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8 mb-8"
        >
          <h3 className="text-lg font-semibold text-deep-blue mb-6">Market Opportunity</h3>
          <div className="space-y-4 max-w-xl">
            {[
              { label: 'TAM — India Logistics', value: '₹31L Cr+', width: '100%' },
              { label: 'SAM — AI-addressable', value: '₹3.5L Cr', width: '45%' },
              { label: 'SOM — Current target', value: '₹35,000 Cr', width: '15%' },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-500 font-medium">{bar.label}</span>
                  <span className="font-semibold text-deep-blue">{bar.value}</span>
                </div>
                <div className="h-2.5 bg-neutral-50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: bar.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-cyan to-blue-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a href="/investors" className="inline-flex items-center gap-2 bg-deep-blue text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-deep-blue/90 transition-colors">
            Request Investor Deck
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
