'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContactFooter() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;
    setSubmitted(true);
  };

  return (
    <>
      {/* Contact / Demo */}
      <section id="contact" className="section-padding section-alt">
        <div className="max-w-content mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div>
              <div className="badge mb-4">Get Started</div>
              <h2 className="section-title mb-4">Experience AI-Powered Logistics</h2>
              <p className="text-neutral-500 mb-8 leading-relaxed">
                Schedule a 30-minute demo, or explore our AI tools right now — simulate routes, predict freight rates, and see optimization in action.
              </p>

              {/* Quick-action CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <a href="#simulator" className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-cyan hover:bg-cyan/5 transition-all group">
                  <div className="w-8 h-8 rounded-md bg-cyan/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-deep-blue group-hover:text-cyan transition-colors">Simulate a Route</div>
                    <div className="text-[11px] text-neutral-400">Interactive AI optimization</div>
                  </div>
                </a>
                <a href="#benchmark" className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-cyan hover:bg-cyan/5 transition-all group">
                  <div className="w-8 h-8 rounded-md bg-cyan/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-deep-blue group-hover:text-cyan transition-colors">Predict Freight Rate</div>
                    <div className="text-[11px] text-neutral-400">Live ML-powered benchmark</div>
                  </div>
                </a>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg className="w-5 h-5 text-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  connect@logisticsnow.in
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg className="w-5 h-5 text-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  409, Neptune&apos;s Flying Colors, Mulund West, Mumbai 400080
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg className="w-5 h-5 text-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +91-9867773508 / +91-9653620207
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="card p-8">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-deep-blue mb-2">{`We'll be in touch!`}</h3>
                  <p className="text-sm text-neutral-500">Our team will reach out within 24 hours to schedule your demo.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-deep-blue block mb-1.5">Name</label>
                    <input
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-deep-blue block mb-1.5">Work Email</label>
                    <input
                      type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-deep-blue block mb-1.5">Company</label>
                    <input
                      value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-deep-blue block mb-1.5">Message <span className="text-neutral-400">(optional)</span></label>
                    <textarea
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none resize-none"
                      placeholder="Tell us about your logistics challenges"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full !py-3">Book Demo</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-blue text-white">
        <div className="max-w-content mx-auto px-5 md:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-md bg-cyan flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2L14 8L8 14L2 8L8 2Z" fill="currentColor" opacity="0.9"/>
                    <circle cx="8" cy="8" r="2" fill="#0A2540"/>
                  </svg>
                </div>
                <span className="text-base font-bold">LogisticsNow</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Building the Digital Backbone of Logistics. AI-powered intelligence for India&apos;s logistics networks.
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">Products</h4>
              <ul className="space-y-2.5">
                <li><Link href="/products" className="text-sm text-neutral-400 hover:text-white transition-colors">LoRRI Platform</Link></li>
                <li><Link href="/ai-technology" className="text-sm text-neutral-400 hover:text-white transition-colors">AI Technology</Link></li>
                <li><Link href="/platform" className="text-sm text-neutral-400 hover:text-white transition-colors">Freight Benchmarking</Link></li>
                <li><Link href="/ai-technology" className="text-sm text-neutral-400 hover:text-white transition-colors">Route Optimization</Link></li>
                <li><Link href="/platform" className="text-sm text-neutral-400 hover:text-white transition-colors">Logistics Intelligence</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">Company</h4>
              <ul className="space-y-2.5">
                <li><Link href="/about" className="text-sm text-neutral-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/customers" className="text-sm text-neutral-400 hover:text-white transition-colors">Customers</Link></li>
                <li><Link href="/investors" className="text-sm text-neutral-400 hover:text-white transition-colors">Investors</Link></li>
                <li><Link href="/careers" className="text-sm text-neutral-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/news" className="text-sm text-neutral-400 hover:text-white transition-colors">News & Events</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">Resources</h4>
              <ul className="space-y-2.5">
                <li><Link href="/solutions" className="text-sm text-neutral-400 hover:text-white transition-colors">Solutions</Link></li>
                <li><a href="https://www.lorri.in/" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-white transition-colors">LoRRI for Shippers</a></li>
                <li><a href="https://transporter.lorri.in/" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-white transition-colors">LoRRI for Carriers</a></li>
                <li><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Terms of Use</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-3">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
              <p className="text-xs text-neutral-500">© 2026 LogisticsNow. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="https://x.com/LogisticsNowLN" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-white transition-colors">Twitter</a>
                <a href="https://www.linkedin.com/company/logisticsnow/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
            <p className="text-xs text-neutral-500">Developed by Adhithya J, Harshini Y, Abishek N, Arya A</p>
          </div>
        </div>
      </footer>
    </>
  );
}
