import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import ContactFooter from '@/components/ContactFooter';

export const metadata: Metadata = {
  title: 'Investors | LogisticsNow',
  description: 'Invest in the future of India\'s logistics intelligence. LogisticsNow is building the National Logistics Intelligence Grid.',
};

const marketStats = [
  { value: '₹16L Cr+', label: 'India Logistics Market', detail: 'One of the largest and fastest-growing logistics markets globally' },
  { value: '14%', label: 'GDP Share', detail: 'Logistics cost as % of GDP in India — double that of developed nations' },
  { value: '6%', label: 'Digitised', detail: 'Only ~6% of India\'s logistics industry is digitised — massive opportunity' },
  { value: '18%+', label: 'CAGR', detail: 'Projected growth rate of logistics-tech sector through 2030' },
];

const highlights = [
  { title: 'AI-Native Platform', desc: 'Built with AI at the core — not bolted on. Our models learn from ₹250 Cr+ of logistics spend data to deliver actionable intelligence.', icon: '🤖' },
  { title: 'Network Effects', desc: 'Every shipper and carrier added strengthens our data moat. 80,000+ routes and 2,200+ carriers create compounding value.', icon: '🔗' },
  { title: 'Revenue Model', desc: 'SaaS subscriptions + transaction-based revenue from freight benchmarking and optimization. High margins, recurring revenue.', icon: '💰' },
  { title: 'Trusted & Neutral', desc: 'We operate as a trusted, neutral platform — a position that is hard to replicate and creates deep switching costs.', icon: '🔒' },
  { title: 'Multi-Continental', desc: 'Data spanning 3 continents. Proven in India, with expansion potential across South-East Asia and Africa.', icon: '🌏' },
  { title: 'Government Alignment', desc: 'Aligned with India\'s National Logistics Policy and PM Gati Shakti vision for integrated logistics infrastructure.', icon: '🏛️' },
];

const milestones = [
  { metric: '80,000+', label: 'Routes Mapped', icon: '🛤️' },
  { metric: '2,200+', label: 'Carriers on Platform', icon: '🚛' },
  { metric: '₹2.5B+', label: 'Spend Analysed', icon: '📊' },
  { metric: '3', label: 'Continents Covered', icon: '🌐' },
  { metric: 'Fortune 500', label: 'Enterprise Clients', icon: '🏢' },
  { metric: '99.9%', label: 'Platform Uptime', icon: '⚡' },
];

export default function InvestorsPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="Investor Relations"
        title="The Future of Logistics is Intelligent"
        subtitle="LogisticsNow is building the National Logistics Intelligence Grid — the AI-powered digital backbone of India's logistics industry."
        breadcrumb="Investors"
      />

      {/* Market Opportunity */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Market Opportunity</h2>
          <p className="section-subtitle text-center mb-14">India&apos;s logistics sector is ripe for intelligent disruption</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketStats.map((s) => (
              <div key={s.label} className="card-interactive p-6 text-center">
                <div className="text-3xl font-bold text-cyan mb-2">{s.value}</div>
                <div className="text-sm font-semibold text-deep-blue mb-2">{s.label}</div>
                <p className="text-xs text-neutral-400">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="py-20 bg-soft-grey">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Why LogisticsNow</h2>
          <p className="section-subtitle text-center mb-14">Strategic advantages that compound over time</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div key={h.title} className="card-interactive p-6 group">
                <span className="text-2xl mb-3 block">{h.icon}</span>
                <h3 className="text-base font-semibold text-deep-blue mb-2">{h.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-deep-blue text-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Platform Traction</h2>
          <p className="text-neutral-300 text-center mb-14 max-w-xl mx-auto">
            Real metrics from a real platform serving real enterprises
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((m) => (
              <div key={m.label} className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl mb-2 block">{m.icon}</span>
                <div className="text-2xl md:text-3xl font-bold text-cyan mb-1">{m.metric}</div>
                <div className="text-sm text-neutral-300">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-4">The Investment Thesis</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              India&apos;s logistics industry is one of the largest in the world — yet one of the least digitised. LogisticsNow sits at the centre of this transformation, building the intelligence layer that connects shippers, carriers, and transporters across the country.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed mb-10">
              With our AI-native platform, trusted neutral positioning, and 80,000+ route data moat, we are uniquely positioned to become the operating system for India&apos;s logistics industry.
            </p>

            <div className="card-interactive p-8 bg-soft-grey">
              <h3 className="text-base font-semibold text-deep-blue mb-3">Interested in learning more?</h3>
              <p className="text-sm text-neutral-500 mb-6">
                We welcome conversations with investors who share our vision of building the National Logistics Intelligence Grid.
              </p>
              <a
                href="mailto:connect@logisticsnow.in?subject=Investor%20Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-deep-blue text-white text-sm font-medium hover:bg-deep-blue/90 transition-colors"
              >
                Contact Investor Relations
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
