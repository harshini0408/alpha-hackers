'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Customers', href: '/customers' },
  { label: 'Investors', href: '/investors' },
  { label: 'Careers', href: '/careers' },
  { label: 'News', href: '/news' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-content mx-auto px-5 md:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-deep-blue flex items-center justify-center">
            <svg className="w-4 h-4 text-cyan" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 8L8 14L2 8L8 2Z" fill="currentColor" opacity="0.9"/>
              <circle cx="8" cy="8" r="2" fill="white"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-deep-blue tracking-tight">Logistics</span>
          <span className="text-lg font-bold text-cyan tracking-tight">Now</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-sm text-neutral-500 hover:text-deep-blue transition-colors font-medium">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#contact" className="text-sm font-medium text-neutral-500 hover:text-deep-blue transition-colors">Contact</a>
          <Link href="/login" className="text-sm font-semibold text-deep-blue border-2 border-deep-blue rounded-lg px-5 py-2 hover:bg-deep-blue hover:text-white transition-colors">Login</Link>
          <a href="#contact" className="btn-primary text-sm !py-2.5 !px-5">Request Demo</a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-deep-blue" aria-label="Toggle menu">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-neutral-100 overflow-hidden">
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-medium text-neutral-500 hover:text-deep-blue">{link.label}</Link>
              ))}
              <div className="pt-3 border-t border-neutral-100 space-y-2">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-center text-sm font-semibold text-deep-blue border-2 border-deep-blue rounded-lg px-5 py-2.5 hover:bg-deep-blue hover:text-white transition-colors">Login</Link>
                <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full text-center text-sm !py-2.5">Request Demo</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
