/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary color palette - Purple & Dark Blue
        primary: {
          50: '#f0f4ff',
          100: '#194bff',
          200: '#525dff',
          300: '#7170ff',
          400: '#8b83ff',
          500: '#a197ff',
          600: '#b6abff',
        },
        surface: {
          50: '#f8fafc',
          100: '#07022e',
          200: '#1f1e42',
          300: '#393658',
          400: '#524f6e',
          500: '#6d6a84',
          600: '#89869c',
        },
        // Accent colors for variety
        accent: {
          cyan: '#00d4ff',
          purple: '#8b5cf6',
          pink: '#ec4899',
          orange: '#f97316',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'orbit': 'orbit 20s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #194bff, 0 0 10px #194bff, 0 0 15px #194bff' },
          '100%': { boxShadow: '0 0 10px #194bff, 0 0 20px #194bff, 0 0 30px #194bff' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'space-gradient': 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      },
    },
  },
  plugins: [],
}