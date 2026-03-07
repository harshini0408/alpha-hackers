'use client';

import { motion } from 'framer-motion';

const layers = [
  {
    title: 'Data Layer',
    desc: 'Unified data ingestion from ERPs, TMS, GPS trackers, market feeds, and IoT sensors.',
    items: ['Real-time GPS tracking', 'ERP & TMS integration', 'Market price feeds', 'Weather & traffic APIs'],
    color: 'bg-neutral-100',
    accent: 'text-neutral-600',
    metric: '2.4M data points/day',
  },
  {
    title: 'AI Intelligence Layer',
    desc: 'Machine learning models for prediction, optimization, and anomaly detection.',
    items: ['Freight rate prediction', 'Delay forecasting', 'Demand sensing', 'Anomaly detection'],
    color: 'bg-cyan-light',
    accent: 'text-cyan',
    metric: '94.2% prediction accuracy',
  },
  {
    title: 'Optimization Engine',
    desc: 'Constraint-based solvers for route, load, and procurement optimization.',
    items: ['Route optimization', 'Load consolidation', 'Carrier matching', 'Cost minimization'],
    color: 'bg-cyan-50',
    accent: 'text-cyan-hover',
    metric: '18% avg cost reduction',
  },
  {
    title: 'Decision Intelligence',
    desc: 'Actionable recommendations and automated workflows for logistics teams.',
    items: ['Automated alerts', 'Approval workflows', 'Performance dashboards', 'Executive reports'],
    color: 'bg-deep-blue-50',
    accent: 'text-deep-blue',
    metric: '3x faster decisions',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

export default function PlatformSection() {
  return (
    <section id="platform" className="section-padding section-alt">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <div className="badge mx-auto mb-4">Platform Architecture</div>
          <h2 className="section-title mb-4">Built for Enterprise Scale</h2>
          <p className="section-subtitle mx-auto">Four integrated layers that transform raw logistics data into intelligent decisions.</p>
        </div>

        {/* Architecture diagram */}
        <div className="max-w-3xl mx-auto space-y-4">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className={`relative rounded-xl p-6 md:p-8 ${layer.color} border border-neutral-200/50`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${layer.accent}`}>Layer {i + 1}</span>
                    <div className="h-px flex-1 bg-neutral-200/60" />
                    <span className="text-xs font-semibold text-deep-blue bg-white/80 px-2 py-0.5 rounded-full">{layer.metric}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-deep-blue mb-1">{layer.title}</h3>
                  <p className="text-sm text-neutral-500">{layer.desc}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:w-[280px] flex-shrink-0">
                  {layer.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-neutral-600">
                      <svg className="w-3.5 h-3.5 text-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connector */}
              {i < layers.length - 1 && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="text-neutral-300">
                    <path d="M8 0v12M4 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
