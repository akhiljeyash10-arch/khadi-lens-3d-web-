/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        khadi: {
          bg: '#08090a',
          surface: '#111316',
          panel: '#181b20',
          border: '#272b33',
          borderLight: '#3a404c',
          text: '#f2eee6',
          textMuted: '#9e978b',
          textDim: '#645f56',
          cotton: '#fbf8f0',
          ivory: '#e8e2d4',
          sand: '#c5bdae',
          amber: '#eab308',
          green: '#22c55e',
          red: '#ef4444',
          cyan: '#38bdf8',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      letterSpacing: {
        'widest-plus': '0.25em',
        'ultra': '0.35em',
      }
    },
  },
  plugins: [],
}
