'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Animated particle along a path ─── */
function FlowParticle({ path, dur, delay, color }: { path: string; dur: number; delay: number; color: string }) {
  return (
    <circle r="3" fill={color} opacity="0.8">
      <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} />
      <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
    </circle>
  );
}

/* ─── Stage node ─── */
function StageNode({ x, y, label, sublabel, icon, delay, inView }: {
  x: number; y: number; label: string; sublabel: string; icon: React.ReactNode; delay: number; inView: boolean;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <rect x={x - 70} y={y - 36} width="140" height="72" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x={x - 70} y={y - 36} width="140" height="72" rx="12" fill="url(#nodeGlow)" opacity="0.5" />
      <g transform={`translate(${x - 42}, ${y - 14})`}>
        <rect width="28" height="28" rx="6" fill="#E8F8FC" />
        <g transform="translate(4, 4)" className="text-cyan">{icon}</g>
      </g>
      <text x={x - 6} y={y - 4} fontSize="12" fontWeight="600" fill="#0A2540">{label}</text>
      <text x={x - 6} y={y + 12} fontSize="9" fill="#94A3B8">{sublabel}</text>
    </motion.g>
  );
}

/* ─── Animated metric card ─── */
function LiveMetric({ label, value, unit, color, delay }: {
  label: string; value: string; unit: string; color: string; delay: number;
}) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setShow(true), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [isInView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      className="p-4 rounded-xl bg-white border border-neutral-100 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-deep-blue">{value}</span>
        <span className="text-xs text-neutral-400">{unit}</span>
      </div>
    </motion.div>
  );
}

/* ─── Pulse ring animation ─── */
function PulseRing({ cx, cy, r, color, delay }: { cx: number; cy: number; r: number; color: string; delay: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="1" opacity="0">
        <animate attributeName="r" values={`${r};${r + 20}`} dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="1" opacity="0">
        <animate attributeName="r" values={`${r};${r + 20}`} dur="2s" begin={`${delay + 1}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0" dur="2s" begin={`${delay + 1}s`} repeatCount="indefinite" />
      </circle>
    </>
  );
}

/* ─── Small SVG icons as JSX ─── */
const DataIcon = <path d="M0 4h20v4H0zM0 12h20v4H0z" stroke="#00B4D8" strokeWidth="1.5" fill="none" />;
const BrainIcon = <path d="M10 2C6 2 3 5 3 8c0 2 1 3.5 3 4.5V16h8v-3.5c2-1 3-2.5 3-4.5 0-3-3-6-7-6z" stroke="#00B4D8" strokeWidth="1.5" fill="none" />;
const ChartIcon = <path d="M3 18L8 10l4 5 5-11" stroke="#00B4D8" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
const TruckIcon = <path d="M2 14h11V6H2v8zm11-4h4l2 3v5h-3m-10 0h7M5 18a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z" stroke="#00B4D8" strokeWidth="1.2" fill="none" />;

export default function AIDataFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const flowPath1 = "M140,70 C200,70 200,70 260,70";
  const flowPath2 = "M400,70 C460,70 460,70 520,70";
  const flowPath3 = "M660,70 C720,70 720,70 780,70";

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            How Our AI Works
          </div>
          <h2 className="section-title mb-4">See AI in Action — Not Just Read About It</h2>
          <p className="section-subtitle mx-auto">
            Watch how raw logistics data flows through our 4-stage AI pipeline to produce real-time intelligence and optimization.
          </p>
        </div>

        {/* Pipeline SVG */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto mb-12 overflow-x-auto hide-scrollbar">
          <svg viewBox="0 0 920 140" className="w-full min-w-[700px]" fill="none">
            <defs>
              <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#00B4D8" stopOpacity="0.1" />
                <stop offset="0.5" stopColor="#00B4D8" stopOpacity="0.3" />
                <stop offset="1" stopColor="#00B4D8" stopOpacity="0.1" />
              </linearGradient>
              <radialGradient id="nodeGlow">
                <stop offset="0" stopColor="#00B4D8" stopOpacity="0.05" />
                <stop offset="1" stopColor="#00B4D8" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Connection lines */}
            <motion.path d={flowPath1} stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 0.5 }} />
            <motion.path d={flowPath2} stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 1 }} />
            <motion.path d={flowPath3} stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 1.5 }} />

            {/* Flow particles */}
            {isInView && (
              <>
                <FlowParticle path={flowPath1} dur={2} delay={0.8} color="#00B4D8" />
                <FlowParticle path={flowPath2} dur={2} delay={1.3} color="#00B4D8" />
                <FlowParticle path={flowPath3} dur={2} delay={1.8} color="#00B4D8" />
                <FlowParticle path={flowPath1} dur={2.5} delay={1.5} color="#0A2540" />
                <FlowParticle path={flowPath2} dur={2.5} delay={2} color="#0A2540" />
                <FlowParticle path={flowPath3} dur={2.5} delay={2.5} color="#0A2540" />
              </>
            )}

            {/* Pulse rings around nodes */}
            <PulseRing cx={70} cy={70} r={40} color="#00B4D8" delay={0} />
            <PulseRing cx={850} cy={70} r={40} color="#22C55E" delay={0.5} />

            {/* Stage nodes */}
            <StageNode x={70} y={70} label="Data Ingestion" sublabel="ERP · GPS · IoT · Market" icon={DataIcon} delay={0} inView={isInView} />
            <StageNode x={330} y={70} label="ML Processing" sublabel="Prediction · Classification" icon={BrainIcon} delay={0.3} inView={isInView} />
            <StageNode x={590} y={70} label="Optimization" sublabel="Routes · Cost · Load" icon={ChartIcon} delay={0.6} inView={isInView} />
            <StageNode x={850} y={70} label="Action" sublabel="Alerts · Decisions · ROI" icon={TruckIcon} delay={0.9} inView={isInView} />
          </svg>
        </div>

        {/* Live metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LiveMetric label="Data Points Processed" value="2.4M" unit="/day" color="#00B4D8" delay={0.2} />
          <LiveMetric label="ML Predictions" value="12.4K" unit="/day" color="#8B5CF6" delay={0.4} />
          <LiveMetric label="Route Optimizations" value="847" unit="active" color="#F59E0B" delay={0.6} />
          <LiveMetric label="Cost Savings Found" value="₹3.2Cr" unit="/month" color="#22C55E" delay={0.8} />
        </div>

        {/* Try It CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap gap-3 justify-center">
            <a href="#benchmark" className="btn-primary">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Try AI Freight Prediction
            </a>
            <a href="#delay-prediction" className="btn-secondary">Test Delay Prediction →</a>
            <a href="#maturity" className="btn-secondary">Get Maturity Score →</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
