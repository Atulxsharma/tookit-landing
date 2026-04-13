import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        tookit: {
          bg: '#0A0A0A',
          card: '#111111',
          line: '#1F1F1F',
          muted: '#A1A1AA',
          green: '#16A34A',
          bright: '#4ADE80'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(22, 163, 74, 0.15), 0 20px 80px rgba(22, 163, 74, 0.08)'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
