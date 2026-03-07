import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import CustomersSection from '@/components/CustomersSection';
import ContactFooter from '@/components/ContactFooter';

export const metadata: Metadata = {
  title: 'Customers | LoRRI AI',
  description: 'See how leading enterprises use LoRRI AI to transform their logistics operations with measurable ROI.',
};

const metrics = [
  { value: '120+', label: 'Enterprise Customers' },
  { value: '18%', label: 'Avg. Cost Savings' },
  { value: '₹2,400Cr+', label: 'Freight Managed Annually' },
  { value: '99.2%', label: 'Platform Uptime' },
];

const logos = [
  'Tata Steel', 'Hindustan Unilever', 'Marico', 'Dalmia Cement',
  'Asian Paints', 'Godrej', 'Mahindra Logistics', 'TCI Express',
  'Gati', 'Rivigo', 'BlackBuck', 'Safexpress',
];

export default function CustomersPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="Customers"
        title="Trusted by Industry Leaders"
        subtitle="120+ enterprises rely on LoRRI AI to make smarter logistics decisions every day."
        breadcrumb="Customers"
      />

      {/* Metrics Strip */}
      <section className="py-12 bg-deep-blue">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan mb-1">{m.value}</div>
                <div className="text-sm text-white/70">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Grid */}
      <section className="py-16 bg-soft-grey">
        <div className="max-w-content mx-auto px-5 md:px-8 text-center">
          <p className="text-sm text-neutral-400 uppercase tracking-wider font-medium mb-8">Trusted Partners</p>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {logos.map((name) => (
              <div key={name} className="bg-white rounded-lg px-4 py-5 shadow-xs flex items-center justify-center text-sm font-medium text-neutral-500 border border-neutral-100">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CustomersSection />
      <ContactFooter />
    </main>
  );
}
