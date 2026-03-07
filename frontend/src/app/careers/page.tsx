import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import CareersSection from '@/components/CareersSection';
import ContactFooter from '@/components/ContactFooter';

export const metadata: Metadata = {
  title: 'Careers | LoRRI AI',
  description: 'Join the team building the intelligence layer for modern logistics. Engineering, AI, and data science roles.',
};

const perks = [
  { icon: '🧠', title: 'Learning Budget', desc: '₹2L annual budget for conferences, courses, and certifications' },
  { icon: '🏠', title: 'Remote-First', desc: 'Work from anywhere in India with quarterly team offsites' },
  { icon: '📈', title: 'Equity', desc: 'Employee stock options so you own what you build' },
  { icon: '🏥', title: 'Health & Wellness', desc: 'Comprehensive health insurance for you and your family' },
  { icon: '🗓️', title: 'Flexible Time', desc: 'Flexible hours and unlimited PTO with team planning' },
  { icon: '🚀', title: 'Growth Path', desc: 'Clear career progression with bi-annual reviews and promotions' },
];

export default function CareersPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="We&apos;re Hiring"
        title="Build the Future of Logistics Intelligence"
        subtitle="We&apos;re a team of engineers, data scientists, and logistics experts on a mission to make supply chains intelligent."
        breadcrumb="Careers"
      />

      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Why LoRRI AI?</h2>
          <p className="section-subtitle text-center mb-14">Perks and benefits designed for high-performers</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="card-interactive p-6">
                <span className="text-2xl mb-3 block">{perk.icon}</span>
                <h3 className="text-base font-semibold text-deep-blue mb-1">{perk.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Culture */}
      <section className="py-16 bg-soft-grey">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-4">Engineering Culture</h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                We believe in shipping fast, iterating often, and building with purpose. Our engineering team works with cutting-edge AI/ML tools on problems that move real freight across India.
              </p>
              <ul className="space-y-3">
                {[
                  'Python, TypeScript, Next.js, FastAPI stack',
                  'scikit-learn, PyTorch for ML models',
                  'Real-time data pipelines with Kafka',
                  'Infrastructure on AWS with Terraform',
                  'Weekly demo days and hackathons',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-cyan mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-deep-blue rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Our Stack</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'AWS', 'scikit-learn', 'PyTorch'].map((tech) => (
                  <div key={tech} className="bg-white/10 rounded-lg px-3 py-2 text-sm text-white/90 text-center">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CareersSection />
      <ContactFooter />
    </main>
  );
}
