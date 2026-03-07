import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PageHeader from '@/components/PageHeader';
import ContactFooter from '@/components/ContactFooter';

export const metadata: Metadata = {
  title: 'News & Events | LogisticsNow',
  description: 'Latest news, events, and industry insights from LogisticsNow — building the National Logistics Intelligence Grid.',
};

const newsItems = [
  {
    date: 'Feb 2025',
    category: 'Event',
    title: 'LogisticsNow at ELSC, Taj Land\'s End Mumbai',
    excerpt: 'We participated in the Express, Logistics & Supply Chain (ELSC) at Taj Land\'s End, Mumbai — showcasing LoRRI\'s AI-powered freight intelligence platform to industry leaders.',
    tag: 'Conference',
  },
  {
    date: 'Jan 2025',
    category: 'Event',
    title: 'Shell Demo Day, Bangalore',
    excerpt: 'LogisticsNow was selected to present at the Shell Demo Day in Bangalore, demonstrating how our AI models are transforming logistics operations for enterprise customers.',
    tag: 'Demo Day',
  },
  {
    date: 'Dec 2024',
    category: 'Event',
    title: 'Global Supply Chain Summit, Mumbai',
    excerpt: 'Our founding team presented the vision for the National Logistics Intelligence Grid at the Global Supply Chain Summit in Mumbai, connecting with supply chain leaders across Asia.',
    tag: 'Summit',
  },
  {
    date: 'Nov 2024',
    category: 'Product',
    title: 'LoRRI AI Intelligence Layer Launch',
    excerpt: 'Launched advanced AI models for freight benchmarking, demand forecasting, and route optimization — powered by data from 80,000+ routes and 2,200+ carriers.',
    tag: 'Product Launch',
  },
  {
    date: 'Oct 2024',
    category: 'Milestone',
    title: '80,000 Routes Mapped on LoRRI',
    excerpt: 'LoRRI platform reached a landmark milestone — 80,000+ freight routes mapped across India and 3 continents, with ₹2.5 billion+ in logistics spend analysed.',
    tag: 'Milestone',
  },
  {
    date: 'Sep 2024',
    category: 'Industry',
    title: 'India\'s National Logistics Policy: One Year On',
    excerpt: 'Our analysis of how India\'s National Logistics Policy is reshaping the industry — and why AI-powered intelligence platforms are key to achieving its vision.',
    tag: 'Insight',
  },
];

const upcomingEvents = [
  {
    date: 'Mar 2025',
    title: 'India Logistics Summit 2025',
    location: 'New Delhi',
    desc: 'LogisticsNow will be showcasing the LoRRI platform and our vision for the National Logistics Intelligence Grid.',
  },
  {
    date: 'Apr 2025',
    title: 'AI in Supply Chain Conference',
    location: 'Mumbai',
    desc: 'Our CTO will present on deploying AI models for real-time freight intelligence in emerging markets.',
  },
  {
    date: 'Jun 2025',
    title: 'LoRRI Product Summit',
    location: 'Virtual',
    desc: 'Annual product summit for LoRRI customers — featuring product roadmap, customer stories, and hands-on workshops.',
  },
];

export default function NewsPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <PageHeader
        badge="News & Events"
        title="What's Happening at LogisticsNow"
        subtitle="Industry events, product launches, and insights from the forefront of logistics intelligence."
        breadcrumb="News & Events"
      />

      {/* News Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Latest News</h2>
          <p className="section-subtitle text-center mb-14">Updates from LogisticsNow and the logistics industry</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <article key={item.title} className="card-interactive p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-cyan">{item.date}</span>
                  <span className="text-neutral-300">·</span>
                  <span className="text-xs text-neutral-400">{item.category}</span>
                </div>
                <h3 className="text-base font-semibold text-deep-blue mb-2 leading-snug">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed flex-1">{item.excerpt}</p>
                <div className="mt-4">
                  <span className="inline-block px-2.5 py-1 text-xs font-medium bg-soft-grey text-deep-blue rounded-full">
                    {item.tag}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-soft-grey">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <h2 className="section-title text-center mb-4">Upcoming Events</h2>
          <p className="section-subtitle text-center mb-14">Meet us at industry conferences and summits</p>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((evt) => (
              <div key={evt.title} className="card-interactive p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan" />
                  <span className="text-xs font-semibold text-cyan">{evt.date}</span>
                </div>
                <h3 className="text-base font-semibold text-deep-blue mb-1">{evt.title}</h3>
                <p className="text-xs text-neutral-400 mb-3">📍 {evt.location}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">{evt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press / Media */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-5 md:px-8 text-center">
          <h2 className="section-title mb-4">Media & Press</h2>
          <p className="section-subtitle mb-10">For press inquiries, partnerships, or media resources</p>
          <a
            href="mailto:connect@logisticsnow.in?subject=Media%20Inquiry"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-deep-blue text-white text-sm font-medium hover:bg-deep-blue/90 transition-colors"
          >
            Contact Media Team
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
