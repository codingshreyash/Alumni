/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pittNavy: '#003594',
        pittDeepNavy: '#13284B',
        pittGold: '#FFB81C',
        pittBeige: '#F6D7B0',
        pittLight: '#EAE6DA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};