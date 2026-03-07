'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-6 z-40 px-5 py-2.5 bg-cyan text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-cyan-hover hover:shadow-xl transition-all"
        >
          Request Demo
        </motion.a>
      )}
    </AnimatePresence>
  );
}
