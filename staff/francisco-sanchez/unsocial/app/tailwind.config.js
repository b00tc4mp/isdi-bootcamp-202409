/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
    './index.html', './src/**/*.{jsx,js,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        fondo: 'var(--color-fondo)', // Añade esto si quieres usar bg-fondo en lugar de bg-[var(--color-fondo)]
      },
    },
    plugins: [],
  }
}