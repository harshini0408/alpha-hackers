import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import ContactFooter from '@/components/ContactFooter';

export const metadata: Metadata = {
  title: 'About Us | LogisticsNow',
  description: 'LogisticsNow is building the Digital Backbone of Logistics — a trusted, neutral platform using AI and Data Science to transform India\'s logistics industry.',
};

const timeline = [
  { year: '2018', title: 'Founded', desc: 'LogisticsNow founded with a vision to organize India\'s fragmented logistics industry using technology.' },
  { year: '2019', title: 'LoRRI Platform Launch', desc: 'Launched LoRRI — the Logistics Rate & Route Intelligence platform for shippers and carriers.' },
  { year: '2020', title: 'Pandemic Pivot', desc: 'Helped enterprises navigate supply chain disruptions with real-time freight intelligence during COVID-19.' },
  { year: '2021', title: 'Enterprise Adoption', desc: 'Onboarded Fortune 500 companies and leading Indian enterprises onto the platform.' },
  { year: '2023', title: 'AI Intelligence Layer', desc: 'Launched advanced AI models for freight benchmarking, demand forecasting, and anomaly detection.' },
  { year: '2025', title: 'National Logistics Grid', desc: 'Expanding toward the National Logistics Intelligence Grid vision — connecting 80,000+ routes across India.' },
];

const values = [
  { icon: '🔒', title: 'Trusted & Neutral', desc: 'We are the trusted, neutral platform for logistics. We earn your trust and keep it — serving both shippers and carriers without bias.' },
  { icon: '🌐', title: 'Global Reach', desc: 'Multi-billion dollar spend data spanning 3 continents. Our analytics deliver multi-million savings while improving service levels.' },
  { icon: '🤖', title: 'AI-First', desc: 'We build with AI at the core — not as an add-on. Every feature is designed to learn, adapt, and optimize automatically.' },
  { icon: '🏗️', title: 'Industry-Built', desc: 'For the industry, of the industry, and by the industry. Deep domain expertise combined with cutting-edge technology.' },
];

const leadership = [
  { name: 'Founder & CEO', role: 'Strategy & Vision', focus: 'Building the national logistics intelligence grid' },
  { name: 'CTO', role: 'Technology & AI', focus: 'AI/ML platform architecture and data science' },
  { name: 'VP Engineering', role: 'Product Development', focus: 'Full-stack platform development and DevOps' },
  { name: 'VP Sales', role: 'Enterprise Growth', focus: 'Enterprise customer acquisition and success' },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="About LogisticsNow"
        title="Building the Digital Backbone of Logistics"
        subtitle="We use the power of AI and Data Science to organize the logistics industry — optimizing operations, time, and revenue for shippers and carriers worldwide."
        breadcrumb="About Us"
      />

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card-interactive p-8 border-l-4 border-l-cyan">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan mb-3">Our Vision</h3>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">National Logistics Intelligence Grid</h2>
              <p className="text-neutral-500 leading-relaxed">
                To create a connected, AI-powered logistics intelligence grid spanning all of India — where every route, carrier, and shipment is optimized in real-time, driving efficiency that is beyond imagination today.
              </p>
            </div>
            <div className="card-interactive p-8 border-l-4 border-l-deep-blue">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-deep-blue mb-3">Our Mission</h3>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">AI-Led Logistics Transformation</h2>
              <p className="text-neutral-500 leading-relaxed">
                To help Carriers, Transporters, and Manufacturers build stronger technology-enabled logistics businesses using data science, predictive intelligence, and optimization at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-soft-grey">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Who We Are</h2>
          <p className="section-subtitle text-center mb-14">A trusted, neutral platform for the logistics industry</p>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              Several companies, including some of India&apos;s most reputed, are using the LogisticsNow platform to drive business visibility and prepare for the upcoming growth and challenges in the logistics industry.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              As the trusted, neutral platform for logistics, we seek to create efficiency which is beyond imagination today. Our initial focus is logistics for large emerging markets like India, where there are significant challenges in terms of lack of business visibility, utilization, transparency, and payments.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { value: '80,000+', label: 'Routes Mapped Worldwide' },
                { value: '2,200+', label: 'Carriers & Transporters' },
                { value: '₹2.5B+', label: 'Logistics Spend Analysed' },
                { value: '3', label: 'Continents Covered' },
              ].map((m) => (
                <div key={m.label} className="bg-white rounded-xl p-6 shadow-xs">
                  <div className="text-2xl md:text-3xl font-bold text-cyan mb-1">{m.value}</div>
                  <div className="text-sm text-neutral-500">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Why LogisticsNow</h2>
          <p className="section-subtitle text-center mb-14">The next level of logistics optimisation</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card-interactive p-6 text-center">
                <span className="text-3xl mb-4 block">{v.icon}</span>
                <h3 className="text-base font-semibold text-deep-blue mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-soft-grey">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Our Journey</h2>
          <p className="section-subtitle text-center mb-14">From startup to national logistics intelligence platform</p>

          <div className="max-w-3xl mx-auto space-y-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-cyan flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{item.year}</div>
                  {i < timeline.length - 1 && <div className="w-0.5 h-full bg-neutral-200 my-1" />}
                </div>
                <div className="pb-8">
                  <h3 className="text-base font-semibold text-deep-blue mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Leadership</h2>
          <p className="section-subtitle text-center mb-14">Experienced team at the intersection of logistics and technology</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((l) => (
              <div key={l.role} className="card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-soft-grey mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-deep-blue mb-0.5">{l.name}</h3>
                <p className="text-xs text-cyan font-medium mb-2">{l.role}</p>
                <p className="text-xs text-neutral-400">{l.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
