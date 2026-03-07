import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import AITechnologySection from '@/components/AITechnologySection';
import MaturityAssessment from '@/components/MaturityAssessment';
import FreightBenchmark from '@/components/FreightBenchmark';
import DelayPrediction from '@/components/DelayPrediction';
import ContactFooter from '@/components/ContactFooter';

export const metadata: Metadata = {
  title: 'AI Technology | LoRRI AI',
  description: 'Explore the AI capabilities powering LoRRI — predictive analytics, freight benchmarking, anomaly detection, and demand forecasting.',
};

export default function AITechnologyPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="AI Technology"
        title="AI That Understands Logistics"
        subtitle="Purpose-built machine learning models trained on real-world logistics data to predict, optimize, and automate supply chain decisions."
        breadcrumb="AI Technology"
      />
      <AITechnologySection />

      {/* AI Models Section */}
      <section className="py-20 bg-soft-grey">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Our AI Models</h2>
          <p className="section-subtitle text-center mb-14">Production-grade models powering logistics intelligence</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'FreightNet', type: 'Regression', metric: '94.2% accuracy', desc: 'Predicts freight rates across 340+ routes using gradient boosting' },
              { name: 'DelayGuard', type: 'Classification', metric: '91.7% precision', desc: 'Forecasts shipment delays using weather, traffic, and historical data' },
              { name: 'DemandSense', type: 'Time Series', metric: '88.5% MAPE', desc: 'Forecasts freight demand by lane and season with ARIMA + ML' },
              { name: 'AnomalyDetect', type: 'Unsupervised', metric: '96.1% recall', desc: 'Identifies cost anomalies and unusual patterns in freight invoices' },
            ].map((model) => (
              <div key={model.name} className="card p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-cyan bg-cyan-light px-2 py-1 rounded">{model.type}</span>
                  <span className="text-xs font-bold text-green-600">{model.metric}</span>
                </div>
                <h3 className="text-lg font-bold text-deep-blue mb-1">{model.name}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive AI Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8 text-center mb-14">
          <h2 className="section-title mb-4">Try Our AI Tools</h2>
          <p className="section-subtitle">Experience logistics intelligence first-hand with interactive demos</p>
        </div>
      </section>

      <MaturityAssessment />
      <FreightBenchmark />
      <DelayPrediction />
      <ContactFooter />
    </main>
  );
}
