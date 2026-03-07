import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import ContactFooter from '@/components/ContactFooter';

export const metadata: Metadata = {
  title: 'Products — LoRRI Platform | LogisticsNow',
  description: 'LoRRI — the Logistics Rate & Route Intelligence platform by LogisticsNow. AI-powered freight benchmarking, route optimization, and logistics intelligence.',
};

const products = [
  {
    name: 'LoRRI for Shippers',
    desc: 'A complete logistics intelligence suite for shippers — benchmarking freight rates, optimizing routes, and managing carrier performance from a single dashboard.',
    features: [
      'AI-powered freight rate benchmarking across 80,000+ routes',
      'Carrier performance scoring & comparison',
      'Route optimization with multi-modal support',
      'Spend analytics and savings identification',
      'RFQ management and negotiation intelligence',
    ],
    cta: { label: 'Explore LoRRI for Shippers', href: 'https://lorri.in' },
    color: 'cyan',
  },
  {
    name: 'LoRRI for Carriers',
    desc: 'Empower your transport business with demand forecasting, fill-rate optimization, and digital load matching — all powered by AI.',
    features: [
      'Digital load board with intelligent matching',
      'Demand forecasting by route and corridor',
      'Dynamic pricing recommendations',
      'Fleet utilization analytics',
      'Digital documentation and payments',
    ],
    cta: { label: 'Explore LoRRI for Carriers', href: 'https://transporter.lorri.in' },
    color: 'deep-blue',
  },
];

const capabilities = [
  { icon: '📊', title: 'Freight Benchmarking', desc: 'Compare your freight rates against market benchmarks from ₹250 Cr+ of analysed spend data.' },
  { icon: '🛤️', title: 'Route Intelligence', desc: 'Optimize routes across 80,000+ mapped corridors with real-time cost, transit time, and reliability data.' },
  { icon: '🤖', title: 'AI Predictions', desc: 'Predict freight rate movements, demand surges, and delivery delays before they happen.' },
  { icon: '📈', title: 'Spend Analytics', desc: 'Visualize and decompose your logistics spend to identify savings opportunities worth crores.' },
  { icon: '🚛', title: 'Carrier Management', desc: 'Score, compare, and manage your carrier portfolio with data-driven performance insights.' },
  { icon: '⚡', title: 'Real-Time Alerts', desc: 'Get notified of rate anomalies, capacity crunches, and market shifts as they happen.' },
];

export default function ProductsPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="Products"
        title="LoRRI — Logistics Rate & Route Intelligence"
        subtitle="The AI-powered platform that gives shippers and carriers the intelligence to optimize every decision across the supply chain."
        breadcrumb="Products"
      />

      {/* Product Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((p) => (
              <div key={p.name} className={`card-interactive p-8 border-t-4 ${p.color === 'cyan' ? 'border-t-cyan' : 'border-t-deep-blue'}`}>
                <h3 className="text-xl font-bold text-deep-blue mb-3">{p.name}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">{p.desc}</p>
                <ul className="space-y-2 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                      <svg className="w-4 h-4 text-cyan mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    p.color === 'cyan'
                      ? 'bg-cyan text-white hover:bg-cyan/90'
                      : 'bg-deep-blue text-white hover:bg-deep-blue/90'
                  }`}
                >
                  {p.cta.label}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-20 bg-soft-grey">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Platform Capabilities</h2>
          <p className="section-subtitle text-center mb-14">Intelligence at every step of the logistics value chain</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c) => (
              <div key={c.title} className="card-interactive p-6">
                <span className="text-2xl mb-3 block">{c.icon}</span>
                <h3 className="text-base font-semibold text-deep-blue mb-2">{c.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How LoRRI Works */}
      <section className="py-20 bg-deep-blue text-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How LoRRI Works</h2>
          <p className="text-neutral-300 text-center mb-14 max-w-2xl mx-auto">
            From connecting your data to delivering intelligent decisions — in four steps
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Connect', desc: 'Integrate with your ERP, TMS, GPS trackers, and market data feeds.' },
              { step: '02', title: 'Analyse', desc: 'AI models process your data against 80,000+ routes and market benchmarks.' },
              { step: '03', title: 'Predict', desc: 'Get AI-powered forecasts for rates, demand, delays, and capacity.' },
              { step: '04', title: 'Optimise', desc: 'Act on intelligent recommendations to reduce cost and improve service.' },
            ].map((s) => (
              <div key={s.step} className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-sm font-bold text-cyan mb-2">{s.step}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8 text-center">
          <h2 className="section-title mb-4">Ready to Transform Your Logistics?</h2>
          <p className="section-subtitle mb-8">
            Join the enterprises using LoRRI to save crores and gain competitive advantage
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan text-white text-sm font-medium hover:bg-cyan/90 transition-colors"
            >
              Schedule a Demo
            </a>
            <a
              href="/ai-technology"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-neutral-200 text-deep-blue text-sm font-medium hover:bg-soft-grey transition-colors"
            >
              Explore AI Technology
            </a>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
