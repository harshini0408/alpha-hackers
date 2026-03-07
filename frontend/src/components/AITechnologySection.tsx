'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const capabilities = [
  {
    id: 'predictive',
    label: 'Predictive Analytics',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Predictive Analytics',
    desc: 'Forecast freight demand, pricing trends, and capacity constraints 14 days ahead using time-series models trained on 3+ years of market data.',
    features: ['Demand forecasting', 'Price trend prediction', 'Capacity planning', 'Seasonal pattern detection'],
    metric: { value: '94.2%', label: 'Forecast accuracy' },
  },
  {
    id: 'benchmark',
    label: 'Freight Benchmarking',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
    title: 'Freight Benchmarking',
    desc: 'Compare your freight costs against market rates across 15,000+ lanes. Identify overspend, negotiate smarter, and track savings over time.',
    features: ['Lane-level benchmarks', 'Carrier rate comparison', 'Savings tracking', 'Market rate index'],
    metric: { value: '12-18%', label: 'Avg. cost savings' },
  },
  {
    id: 'anomaly',
    label: 'Anomaly Detection',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: 'Anomaly Detection',
    desc: 'Automatically flag unusual patterns in invoicing, transit times, fuel surcharges, and carrier behavior for immediate investigation.',
    features: ['Invoice anomalies', 'Transit time outliers', 'Route deviations', 'Cost spike alerts'],
    metric: { value: '₹2.1Cr', label: 'Anomalies caught/yr' },
  },
  {
    id: 'demand',
    label: 'Demand Forecasting',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: 'Demand Forecasting',
    desc: 'Predict shipment volumes and truck requirements up to 30 days in advance. Optimize fleet utilization and reduce empty miles.',
    features: ['Volume prediction', 'Fleet sizing', 'Empty mile reduction', 'Warehouse load planning'],
    metric: { value: '34%', label: 'Better fleet utilization' },
  },
];

export default function AITechnologySection() {
  const [active, setActive] = useState(capabilities[0].id);
  const current = capabilities.find((c) => c.id === active)!;

  return (
    <section id="ai-technology" className="section-padding">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <div className="badge mx-auto mb-4">AI Technology</div>
          <h2 className="section-title mb-4">How AI Powers Logistics Decisions</h2>
          <p className="section-subtitle mx-auto">Four core AI capabilities that give your logistics team an unfair advantage.</p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Left tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar">
            {capabilities.map((cap) => (
              <button
                key={cap.id}
                onClick={() => setActive(cap.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all whitespace-nowrap ${
                  active === cap.id
                    ? 'bg-deep-blue text-white shadow-md'
                    : 'text-neutral-500 hover:bg-neutral-50 hover:text-deep-blue'
                }`}
              >
                <span className={active === cap.id ? 'text-cyan' : 'text-neutral-400'}>{cap.icon}</span>
                {cap.label}
              </button>
            ))}
          </div>

          {/* Right content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="card p-8"
            >
              <h3 className="text-xl font-semibold text-deep-blue mb-3">{current.title}</h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">{current.desc}</p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {current.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex items-end gap-3 p-4 bg-soft-grey rounded-lg">
                <span className="text-3xl font-bold text-deep-blue tracking-tight">{current.metric.value}</span>
                <span className="text-sm text-neutral-400 pb-1">{current.metric.label}</span>
              </div>

              {/* Mini visualization */}
              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-end gap-1 h-16">
                  {Array.from({ length: 20 }, (_, i) => {
                    const h = 20 + Math.sin(i * 0.5) * 15 + Math.random() * 10;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-cyan/30 hover:bg-cyan/60 transition-colors"
                        style={{ height: `${h}%` }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-neutral-400">
                  <span>30 days ago</span>
                  <span>Today</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
