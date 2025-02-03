/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
    './src/**/*.{jsx,js,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        fondo: 'var(--color-fondo)',
        amarilloCanario: 'var(--color-yellow)'
      },
    },
    plugins: [],
  }
}