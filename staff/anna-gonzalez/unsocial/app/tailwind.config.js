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
        'dela-gothic-one': ['"Dela Gothic One"', 'cursive'],
      },
      backgroundImage: {
        'radial-custom': 'radial-gradient(circle at bottom left, theme("colors.green.600"), theme("colors.blue.700") 40%, theme("colors.blue.700") 50%, theme("colors.blue.700") 70%, theme("colors.green.600") 100%)',
      },
      animation: {
        gradient: 'gradient 6s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}

