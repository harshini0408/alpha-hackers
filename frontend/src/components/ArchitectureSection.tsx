'use client';

import { motion } from 'framer-motion';

const layers = [
  {
    label: 'Data Sources',
    color: 'bg-blue-500',
    items: ['GPS / IoT Tracking', 'Traffic APIs (Google, HERE)', 'Weather APIs (IMD)', 'Fuel Price Feeds', 'Carrier Rate Cards', 'Historical Freight Data'],
    icon: '📡',
  },
  {
    label: 'Data Ingestion Layer',
    color: 'bg-indigo-500',
    items: ['Real-time Stream Processing', 'Data Cleaning & Normalization', 'Feature Engineering Pipeline', '125K+ Route Profiles'],
    icon: '🔄',
  },
  {
    label: 'ML Prediction Engine',
    color: 'bg-cyan',
    items: ['FreightNet v2.1 (Rate Regression)', 'DelayGuard (Risk Classification)', 'DemandSense (Forecasting)', 'Feature Importance (XAI)'],
    icon: '🧠',
  },
  {
    label: 'Optimization Engine',
    color: 'bg-emerald-500',
    items: ['Route Optimization (VRP)', 'Cost Minimization', 'Multi-Modal Planning', 'Carrier Matching Algorithm'],
    icon: '⚡',
  },
  {
    label: 'Decision Intelligence',
    color: 'bg-deep-blue',
    items: ['Freight Benchmark Explorer', 'Scenario Simulation', 'AI Recommendations', 'Carrier & Shipper Dashboards'],
    icon: '📊',
  },
];

export default function ArchitectureSection() {
  return (
    <section className="section-padding">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">System Architecture</div>
          <h2 className="section-title mb-4">How LogisticsNow AI Works</h2>
          <p className="section-subtitle mx-auto">
            End-to-end ML pipeline — from raw data ingestion to actionable decision intelligence.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-1">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="flex items-stretch gap-4">
                {/* Vertical connector */}
                <div className="flex flex-col items-center w-10 flex-shrink-0">
                  <div className={`w-10 h-10 rounded-xl ${layer.color} flex items-center justify-center text-lg shadow-sm`}>
                    {layer.icon}
                  </div>
                  {i < layers.length - 1 && (
                    <div className="flex-1 w-px bg-neutral-200 my-1 relative">
                      <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan"
                        animate={{ y: [0, 24, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <h3 className="text-sm font-bold text-deep-blue mb-2">{layer.label}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.items.map(item => (
                      <span key={item} className="text-xs px-2.5 py-1 bg-soft-grey rounded-md text-neutral-600 border border-neutral-100">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}