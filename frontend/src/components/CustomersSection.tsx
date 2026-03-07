'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const caseStudies = [
  {
    industry: 'FMCG',
    company: 'Leading FMCG Conglomerate',
    challenge: 'Fragmented carrier network with 200+ transporters across 40 distribution centers.',
    solution: 'Deployed LoRRI procurement module for automated benchmarking and carrier scoring.',
    metrics: [
      { value: '₹4.2Cr', label: 'Annual savings' },
      { value: '18%', label: 'Cost reduction' },
      { value: '3 mo', label: 'Time to ROI' },
    ],
    quote: '"LoRRI gave us visibility we never had. Procurement decisions that took days now happen in minutes."',
    author: 'VP Supply Chain',
  },
  {
    industry: 'Automotive',
    company: 'Tier-1 Auto Manufacturer',
    challenge: 'JIT delivery failures causing ₹12L/day production line stoppages.',
    solution: 'LoRRI delay prediction model with real-time route monitoring and proactive alerts.',
    metrics: [
      { value: '92%', label: 'On-time delivery' },
      { value: '67%', label: 'Fewer stoppages' },
      { value: '₹8.5Cr', label: 'Saved annually' },
    ],
    quote: '"The AI predictions are remarkably accurate. We now act before delays happen, not after."',
    author: 'Head of Logistics',
  },
  {
    industry: 'Chemicals',
    company: 'Specialty Chemicals Exporter',
    challenge: 'Complex multi-modal shipments with hazmat compliance across 12 states.',
    solution: 'End-to-end route optimization with compliance verification and carbon tracking.',
    metrics: [
      { value: '28%', label: 'Transit reduction' },
      { value: '100%', label: 'Compliance rate' },
      { value: '340t', label: 'CO₂ saved/yr' },
    ],
    quote: '"Route compliance and optimization in one platform — exactly what we needed."',
    author: 'Director of Operations',
  },
];

const testimonials = [
  { text: 'LoRRI transformed how we think about freight. Data-driven decisions, finally.', author: 'COO, E-Commerce Platform', },
  { text: 'Switching from spreadsheets to LoRRI was like upgrading from a bicycle to a jet.', author: 'Supply Chain Lead, Retail Chain', },
  { text: 'The ROI was clear within 6 weeks. Our board was impressed.', author: 'CFO, Pharma Company', },
];

const filters = ['All', 'FMCG', 'Automotive', 'Chemicals'];

export default function CustomersSection() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? caseStudies : caseStudies.filter((c) => c.industry === filter);

  return (
    <section id="customers" className="section-padding">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">Customers</div>
          <h2 className="section-title mb-4">Proven Results Across Industries</h2>
          <p className="section-subtitle mx-auto">See how enterprises use LoRRI to transform logistics operations.</p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === f ? 'bg-deep-blue text-white' : 'text-neutral-500 hover:bg-neutral-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Case Studies */}
        <div className="space-y-6">
          {filtered.map((cs, i) => (
            <motion.div
              key={cs.company}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-6 md:p-8"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="badge">{cs.industry}</span>
                <h3 className="text-lg font-semibold text-deep-blue">{cs.company}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">Challenge</div>
                  <p className="text-sm text-neutral-600">{cs.challenge}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">Solution</div>
                  <p className="text-sm text-neutral-600">{cs.solution}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-soft-grey rounded-lg">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-deep-blue">{m.value}</div>
                    <div className="text-xs text-neutral-400 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="border-l-2 border-cyan pl-4">
                <p className="text-sm text-neutral-500 italic">{cs.quote}</p>
                <p className="text-xs text-neutral-400 mt-1">— {cs.author}, {cs.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-soft-grey"
            >
              <p className="text-sm text-neutral-600 italic mb-3">&ldquo;{t.text}&rdquo;</p>
              <p className="text-xs font-medium text-neutral-400">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
