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
        'surface': '#060e20',
        'surface-dim': '#060e20',
        'surface-bright': '#1f2b49',
        'surface-container-lowest': '#000000',
        'surface-container-low': '#091328',
        'surface-container': '#0f1930',
        'surface-container-high': '#141f38',
        'surface-container-highest': '#192540',
        'surface-variant': '#192540',
        'on-surface': '#dee5ff',
        'on-surface-variant': '#a3aac4',
        'primary': '#a1faff',
        'primary-dim': '#00e5ee',
        'primary-container': '#00f4fe',
        'on-primary': '#006165',
        'secondary': '#69f6b8',
        'secondary-dim': '#58e7ab',
        'on-secondary': '#005a3c',
        'tertiary': '#70aaff',
        'outline': '#6d758c',
        'outline-variant': '#40485d',
        'background': '#060e20',
        'on-background': '#dee5ff',
      },
      fontFamily: {
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        '2xl': '0.75rem',
        '3xl': '1rem',
        full: '9999px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
