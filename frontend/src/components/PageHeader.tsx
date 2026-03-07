'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle: string;
  breadcrumb: string;
}

export default function PageHeader({ badge, title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-soft-grey to-white">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-deep-blue font-medium">{breadcrumb}</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {badge && (
            <span className="badge mb-4 inline-block">{badge}</span>
          )}
          <h1 className="text-[40px] md:text-hero font-bold text-deep-blue tracking-tight leading-[1.1] max-w-2xl mb-4">
            {title}
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
