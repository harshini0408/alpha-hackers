'use client';

import { motion } from 'framer-motion';

const industries = [
  {
    name: 'Manufacturing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    desc: 'Optimize inbound raw material flows, reduce production downtime with JIT delivery intelligence.',
    benefits: ['22% reduction in inbound delays', 'JIT delivery optimization', 'Supplier performance tracking'],
  },
  {
    name: 'FMCG',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    desc: 'Manage high-frequency distribution across thousands of SKUs with demand-driven routing.',
    benefits: ['18% cost reduction', 'Demand-driven routing', 'Multi-SKU optimization'],
  },
  {
    name: 'Retail & E-Commerce',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.997 2.997 0 00.77-1.665l.834-5.005A1.125 1.125 0 014.72 1.5h14.56a1.125 1.125 0 011.117.98l.834 5.005c.06.36.017.72-.118 1.065" />
      </svg>
    ),
    desc: 'Last-mile optimization, return logistics, and warehouse-to-doorstep delivery intelligence.',
    benefits: ['34% faster last-mile', 'Return logistics AI', 'Warehouse load balancing'],
  },
  {
    name: 'Logistics Providers',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.143-.504 1.167-1.125a49.61 49.61 0 00-1.205-14.375 1.125 1.125 0 00-.928-.753 48.688 48.688 0 00-7.316-.555A48.693 48.693 0 003.75 3.68a1.125 1.125 0 00-.929.753A49.413 49.413 0 001.625 18.75c.024.621.547 1.125 1.167 1.125" />
      </svg>
    ),
    desc: 'Fleet optimization, carrier management, and multi-modal transport intelligence platform.',
    benefits: ['Fleet utilization +30%', 'Multi-modal planning', 'Dynamic pricing engine'],
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="section-padding section-alt">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <div className="badge mx-auto mb-4">Industry Solutions</div>
          <h2 className="section-title mb-4">Logistics Intelligence for Every Industry</h2>
          <p className="section-subtitle mx-auto">Purpose-built solutions that understand your industry{"'"}s unique logistics challenges.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="card card-interactive p-6 md:p-8 cursor-default"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-light flex items-center justify-center text-cyan flex-shrink-0">
                  {ind.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-deep-blue">{ind.name}</h3>
                  <p className="text-sm text-neutral-500 mt-1 leading-relaxed">{ind.desc}</p>
                </div>
              </div>

              <div className="space-y-2 ml-14">
                {ind.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="w-3.5 h-3.5 text-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {b}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
