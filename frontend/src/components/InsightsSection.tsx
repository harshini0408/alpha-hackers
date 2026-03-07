'use client';

import { motion } from 'framer-motion';

const articles = [
  {
    tag: 'AI Research',
    title: 'How Transformer Models Are Reshaping Freight Demand Forecasting',
    excerpt: 'A deep dive into how attention mechanisms improve prediction accuracy for multi-modal logistics networks.',
    date: 'Feb 2026',
    readTime: '8 min',
  },
  {
    tag: 'Industry Report',
    title: '2026 State of India Logistics: Digital Maturity Index',
    excerpt: 'LoRRI analysis of 500+ enterprises reveals the digital adoption gap in Indian logistics and the path forward.',
    date: 'Jan 2026',
    readTime: '15 min',
  },
  {
    tag: 'Supply Chain',
    title: 'Building Resilient Supply Chains with Predictive Intelligence',
    excerpt: 'Lessons from 2025 disruptions and how AI-first logistics platforms enable proactive risk management.',
    date: 'Jan 2026',
    readTime: '6 min',
  },
  {
    tag: 'Product Update',
    title: 'Introducing Multi-Modal Route Optimization in LoRRI',
    excerpt: 'Our latest feature combines road, rail, and waterway options for optimal cost and carbon efficiency.',
    date: 'Dec 2025',
    readTime: '5 min',
  },
  {
    tag: 'Case Study',
    title: 'How a Top FMCG Brand Saved ₹4.2Cr with AI-Powered Procurement',
    excerpt: 'A detailed walkthrough of automated benchmarking, carrier scoring, and real-time rate negotiations.',
    date: 'Dec 2025',
    readTime: '10 min',
  },
  {
    tag: 'AI Research',
    title: 'Graph Neural Networks for Logistics Network Optimization',
    excerpt: 'Exploring how GNNs model complex transport networks for better hub placement and route planning.',
    date: 'Nov 2025',
    readTime: '12 min',
  },
];

const tagColors: Record<string, string> = {
  'AI Research': 'bg-cyan-light text-cyan-hover',
  'Industry Report': 'bg-deep-blue-50 text-deep-blue',
  'Supply Chain': 'bg-green-50 text-green-700',
  'Product Update': 'bg-purple-50 text-purple-700',
  'Case Study': 'bg-orange-50 text-orange-700',
};

export default function InsightsSection() {
  return (
    <section id="insights" className="section-padding">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <div className="badge mx-auto mb-4">Insights</div>
          <h2 className="section-title mb-4">Research & Industry Insights</h2>
          <p className="section-subtitle mx-auto">The latest in supply chain AI, logistics research, and industry trends.</p>
        </div>

        {/* Featured article */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8 mb-8"
        >
          <div className="grid md:grid-cols-[1fr_280px] gap-6 items-center">
            <div>
              <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold mb-3 ${tagColors[articles[0].tag] || 'bg-neutral-100 text-neutral-500'}`}>
                {articles[0].tag}
              </span>
              <h3 className="text-xl font-semibold text-deep-blue mb-2">{articles[0].title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-3">{articles[0].excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <span>{articles[0].date}</span>
                <span>·</span>
                <span>{articles[0].readTime} read</span>
              </div>
            </div>
            <div className="hidden md:block h-44 bg-soft-grey rounded-lg flex items-center justify-center">
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-cyan/5 to-deep-blue/5 flex items-center justify-center">
                <svg className="w-12 h-12 text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.331 0 4.512.89 6.148 2.354M12 6.042c1.898-1.488 4.293-2.292 6.75-2.292a8.982 8.982 0 013 .512v14.25A8.987 8.987 0 0018 18c-2.331 0-4.512.89-6.148 2.354M12 6.042V20.354" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold mb-3 ${tagColors[article.tag] || 'bg-neutral-100 text-neutral-500'}`}>
                {article.tag}
              </span>
              <h3 className="text-sm font-semibold text-deep-blue mb-2 group-hover:text-cyan transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime} read</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
