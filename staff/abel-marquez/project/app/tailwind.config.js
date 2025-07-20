/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './index.html',              
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Slab'], // Configuración para Roboto Slab
      },
    },
  },
  plugins: [],
};
