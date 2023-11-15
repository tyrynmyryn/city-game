/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        700: '#3f3f46',
      },
      cool: {
        gray: {
          200: '#e5e7eb',
        },
      },
      violet: {
        600: '#7c3aed',
      },
    },
    extend: {
      fontFamily: {
        helvetica: ['Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
