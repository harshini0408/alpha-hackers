import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import InsightsSection from '@/components/InsightsSection';
import ContactFooter from '@/components/ContactFooter';

export const metadata: Metadata = {
  title: 'Insights | LoRRI AI',
  description: 'Logistics research, supply chain insights, and AI in logistics — from the LoRRI AI team.',
};

const categories = [
  { name: 'AI Research', count: 12 },
  { name: 'Industry Reports', count: 8 },
  { name: 'Supply Chain', count: 15 },
  { name: 'Product Updates', count: 6 },
  { name: 'Case Studies', count: 9 },
];

export default function InsightsPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="Knowledge Hub"
        title="Insights & Research"
        subtitle="Deep dives into AI-powered logistics, supply chain strategy, and industry trends from our team of experts."
        breadcrumb="Insights"
      />

      {/* Category Navigation */}
      <section className="py-8 bg-soft-grey border-b border-neutral-100">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <div className="flex flex-wrap gap-3">
            <span className="text-sm font-medium text-white bg-deep-blue px-4 py-2 rounded-lg cursor-pointer">All</span>
            {categories.map((cat) => (
              <span key={cat.name} className="text-sm font-medium text-neutral-500 bg-white px-4 py-2 rounded-lg border border-neutral-200 hover:border-cyan hover:text-cyan transition-colors cursor-pointer">
                {cat.name} <span className="text-neutral-300 ml-1">({cat.count})</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <InsightsSection />

      {/* Newsletter */}
      <section className="py-16 bg-deep-blue">
        <div className="max-w-content mx-auto px-5 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay Informed</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Get weekly insights on AI in logistics, supply chain optimization, and industry trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan text-sm"
            />
            <button className="bg-cyan hover:bg-cyan-hover text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
