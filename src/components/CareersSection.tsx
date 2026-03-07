'use client';

import { motion } from 'framer-motion';

const values = [
  { title: 'AI-First Engineering', desc: 'We build with ML at the core, not as an afterthought.', icon: '🧠' },
  { title: 'Ship Fast, Learn Faster', desc: 'Weekly releases, rapid iteration, data-driven decisions.', icon: '🚀' },
  { title: 'Deep Domain Expertise', desc: 'Logistics is complex. We embrace that complexity.', icon: '📦' },
  { title: 'Impact Over Output', desc: 'We measure success by customer outcomes, not lines of code.', icon: '📈' },
];

const roles = [
  { title: 'Senior ML Engineer', team: 'AI Platform', location: 'Bengaluru', type: 'Full-time' },
  { title: 'Full-Stack Developer', team: 'Product', location: 'Bengaluru / Remote', type: 'Full-time' },
  { title: 'Data Scientist', team: 'Intelligence', location: 'Bengaluru', type: 'Full-time' },
  { title: 'Product Designer', team: 'Design', location: 'Remote', type: 'Full-time' },
  { title: 'Solutions Engineer', team: 'Customer Success', location: 'Mumbai', type: 'Full-time' },
  { title: 'DevOps Engineer', team: 'Infrastructure', location: 'Bengaluru', type: 'Full-time' },
];



const projects = [
  {
    title: 'FreightNet v2 — Freight Rate Prediction Engine',
    desc: 'Multi-variable regression model trained on 3+ years of freight data. Predicts benchmark rates across 80,000+ Indian routes with 94% accuracy.',
    tags: ['ML', 'Python', 'XGBoost'],
  },
  {
    title: 'DelayGuard — Real-time Delay Prediction',
    desc: 'Logistic regression classifier that analyzes weather, traffic, route history, and 50+ features to predict delivery delays before dispatch.',
    tags: ['Deep Learning', 'Real-time', 'IoT'],
  },
  {
    title: 'National Logistics Grid — Connected Intelligence',
    desc: 'Graph-based network optimization platform that connects 15+ hubs with shared AI intelligence for optimal routing and load planning.',
    tags: ['Graph NN', 'Optimization', 'Scale'],
  },
];

export default function CareersSection() {
  return (
    <section id="careers" className="section-padding section-alt">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <div className="badge mx-auto mb-4">Careers</div>
          <h2 className="section-title mb-4">Build the Future of Logistics AI</h2>
          <p className="section-subtitle mx-auto">Join a team of engineers, data scientists, and logistics experts reshaping a ₹31L Cr+ industry.</p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-white border border-neutral-100 hover:shadow-md hover:border-cyan/20 transition-all"
            >
              <div className="text-2xl mb-3">{v.icon}</div>
              <h3 className="text-sm font-semibold text-deep-blue mb-1">{v.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>



        {/* Engineering Projects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-deep-blue text-center mb-2">What You&apos;ll Build</h3>
          <p className="text-sm text-neutral-500 text-center mb-8">Real AI systems solving real logistics problems at scale.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-light text-cyan rounded-full">{tag}</span>
                  ))}
                </div>
                <h4 className="text-sm font-semibold text-deep-blue mb-2">{p.title}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open roles */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-deep-blue mb-6">Open Positions</h3>
          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-neutral-100 hover:border-cyan/20 hover:shadow-sm transition-all">
                <div>
                  <h4 className="text-sm font-semibold text-deep-blue">{role.title}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{role.team} · {role.location} · {role.type}</p>
                </div>
                <a href={`mailto:24z108@psgitech.ac.in?subject=Application for ${role.title}&body=Hi, I would like to apply for the ${role.title} position.`} className="mt-3 sm:mt-0 text-sm font-medium text-cyan hover:text-cyan-hover transition-colors">
                  Apply →
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-neutral-500 mb-3">{`Don't see your role?`}</p>
            <a href="mailto:24z108@psgitech.ac.in?subject=Resume Submission — LogisticsNow" className="btn-secondary inline-block">Send us your resume</a>
          </div>
        </div>
      </div>
    </section>
  );
}
