/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fefdf8',
          100: '#e8effdfe',
          200: '#c4eafaff',
          300: '#9fc4f7ff',
          400: '#7aa4f1ff',
          500: '#3769d4ff',
          600: '#1f2eb8ff',
          700: '#1a2b9cff',
          800: '#151a80ff',
          900: '#101f64ff',
        },
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};