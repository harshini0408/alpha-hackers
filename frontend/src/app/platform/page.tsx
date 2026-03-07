import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import PlatformSection from '@/components/PlatformSection';
import DashboardSection from '@/components/DashboardSection';
import ContactFooter from '@/components/ContactFooter';

export const metadata: Metadata = {
  title: 'Platform | LoRRI AI',
  description: 'Explore the LoRRI logistics intelligence platform — from data ingestion to AI-powered decision intelligence.',
};

export default function PlatformPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="Platform"
        title="The Intelligence Layer for Logistics"
        subtitle="LoRRI connects your data sources, applies AI models, and delivers actionable intelligence across your logistics network."
        breadcrumb="Platform"
      />
      <PlatformSection />
      <DashboardSection />

      {/* Platform Capabilities Deep-Dive */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">How It Works</h2>
          <p className="section-subtitle text-center mb-14">From raw data to intelligent decisions in four layers</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Connect',
                desc: 'Integrate with your ERPs, TMS, GPS trackers, and market data feeds through our universal connectors.',
              },
              {
                step: '02',
                title: 'Analyze',
                desc: 'Our AI models process millions of data points to identify patterns, predict outcomes, and detect anomalies.',
              },
              {
                step: '03',
                title: 'Act',
                desc: 'Receive actionable recommendations, automated alerts, and optimization suggestions in real-time.',
              },
            ].map((item) => (
              <div key={item.step} className="card-interactive p-8">
                <span className="text-4xl font-bold text-cyan/20 mb-4 block">{item.step}</span>
                <h3 className="text-xl font-semibold text-deep-blue mb-2">{item.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Partners */}
      <section className="py-16 bg-soft-grey">
        <div className="max-w-content mx-auto px-5 md:px-8 text-center">
          <h2 className="section-title mb-4">Seamless Integrations</h2>
          <p className="section-subtitle mb-10">Connect with the tools your logistics team already uses</p>
          <div className="flex flex-wrap justify-center gap-6">
            {['SAP', 'Oracle TMS', 'Salesforce', 'FourKites', 'project44', 'Trimble', 'Descartes', 'BluJay'].map((name) => (
              <div key={name} className="bg-white rounded-lg px-6 py-4 shadow-xs text-sm font-medium text-neutral-600 border border-neutral-100">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
