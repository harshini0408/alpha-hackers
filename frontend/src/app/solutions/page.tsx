import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import SolutionsSection from '@/components/SolutionsSection';
import ContactFooter from '@/components/ContactFooter';

export const metadata: Metadata = {
  title: 'Solutions | LoRRI AI',
  description: 'Industry-specific logistics intelligence solutions for Manufacturing, FMCG, Retail, and Logistics Providers.',
};

const useCases = [
  {
    industry: 'Manufacturing',
    cases: [
      { title: 'Inbound Logistics Optimization', desc: 'Reduce raw material transit times by 22% with AI-powered supplier route optimization and consolidation.' },
      { title: 'Production-Sync Delivery', desc: 'Align inbound shipments with production schedules to minimize warehouse holding costs.' },
      { title: 'Multi-Plant Network Design', desc: 'Optimize distribution across multiple manufacturing facilities using demand forecasting.' },
    ],
  },
  {
    industry: 'FMCG',
    cases: [
      { title: 'Demand-Driven Distribution', desc: 'Match distribution capacity with seasonal demand patterns across urban and rural markets.' },
      { title: 'Last-Mile Cost Reduction', desc: 'Reduce last-mile delivery costs by 18% through intelligent route clustering and carrier selection.' },
      { title: 'Freshness Guarantee', desc: 'Ensure perishable goods reach stores within optimal timeframes using real-time tracking.' },
    ],
  },
  {
    industry: 'Retail & E-Commerce',
    cases: [
      { title: 'Omnichannel Fulfillment', desc: 'Optimize inventory placement and routing across warehouses, stores, and dark stores.' },
      { title: 'Returns Logistics', desc: 'Reduce reverse logistics costs by 30% with AI-powered returns routing and consolidation.' },
      { title: 'Peak Season Scaling', desc: 'Dynamically scale logistics capacity during sales events using predictive demand models.' },
    ],
  },
  {
    industry: 'Logistics Providers',
    cases: [
      { title: 'Fleet Utilization', desc: 'Increase fleet utilization by 25% with intelligent load matching and backhaul optimization.' },
      { title: 'Dynamic Pricing', desc: 'Set competitive freight rates based on real-time market benchmarks and demand indices.' },
      { title: 'Customer SLA Management', desc: 'Proactively manage delivery SLAs with predictive delay detection and automated alerts.' },
    ],
  },
];

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="Solutions"
        title="Intelligence for Every Logistics Challenge"
        subtitle="Purpose-built AI solutions tailored to the unique demands of your industry."
        breadcrumb="Solutions"
      />
      <SolutionsSection />

      {/* Detailed Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Use Cases by Industry</h2>
          <p className="section-subtitle text-center mb-14">Real-world applications delivering measurable impact</p>

          <div className="space-y-16">
            {useCases.map((industry) => (
              <div key={industry.industry}>
                <h3 className="text-2xl font-bold text-deep-blue mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-cyan rounded-full" />
                  {industry.industry}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {industry.cases.map((c) => (
                    <div key={c.title} className="card-interactive p-6">
                      <h4 className="text-base font-semibold text-deep-blue mb-2">{c.title}</h4>
                      <p className="text-sm text-neutral-500 leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 bg-soft-grey">
        <div className="max-w-content mx-auto px-5 md:px-8 text-center">
          <h2 className="section-title mb-10">Measurable Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '18%', label: 'Average Cost Reduction' },
              { value: '3.2x', label: 'ROI in First Year' },
              { value: '40%', label: 'Faster Decision Making' },
              { value: '95%', label: 'On-Time Delivery Rate' },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-xl p-6 shadow-xs">
                <div className="text-3xl font-bold text-cyan mb-1">{m.value}</div>
                <div className="text-sm text-neutral-500">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
