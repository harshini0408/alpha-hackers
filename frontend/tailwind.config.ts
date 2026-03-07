import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'deep-blue': {
          DEFAULT: '#0A2540',
          50: '#E8ECF0',
          100: '#C5CED8',
          200: '#8A9DB3',
          300: '#506B8E',
          400: '#1A3A69',
          600: '#081D33',
          800: '#051426',
        },
        cyan: {
          DEFAULT: '#00B4D8',
          hover: '#0096B7',
          light: '#E8F8FC',
          50: '#F0FBFE',
          100: '#CCEFF7',
          200: '#80D9EE',
          300: '#33C3E5',
          400: '#00B4D8',
          500: '#0096B7',
          600: '#007896',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
        },
        soft: {
          grey: '#F4F6F8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        'content': '1200px',
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'section': ['32px', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '700' }],
        'sub': ['20px', { lineHeight: '1.5', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '1.6' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
