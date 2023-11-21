/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      gray: {
        100: '#f4f4f5',
        400: '#a1a1aa',
        700: '#3f3f46',
      },
      cool: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
        },
      },
      violet: {
        50: '#f5f3ff',
        300: '#c4b5fd',
        500: '#8b5cf6',
        600: '#7c3aed',
      },
    },
    extend: {
      fontFamily: {
        helvetica: ['Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: []
};
