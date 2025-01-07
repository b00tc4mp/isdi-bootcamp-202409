/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.jsx'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3274F7',
          dark: '#2B4881'
        },
        secondary: '#94A3C0',
        accent: '#94AEE3',
        background: {
          light: '#E5DFE6',
          dark: '#7F7E8B'
        },
        text: '#60697C'
      },
    },
  },
  plugins: [],
}

