/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    './index.html',
    './src/**/*.jsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'Kavoon', 'sans-serif'],
        serif: ['Kavoon', 'Noto Sans', 'serif'],
      },
    },
  },
  plugins: [],
}