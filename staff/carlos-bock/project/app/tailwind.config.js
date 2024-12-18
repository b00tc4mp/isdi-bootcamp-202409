/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        primary: '#2a6592',
        secondary: '#f4645f',
        neutralLight: '#f5f5f5',
        neutralDark: '#2c2c2c',
        cardBorder: '#d0d0d0',
      },
      spacing: {
        15: '60px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
