/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.jsx'
  ],
  theme: {
    extend: {
      colors: {
        'back': '#8CEDC7',
        'customblack': '#0B0B0D',
        'box': '#DAF3EA',
        'button': '#6BB39B',
        'input': '#F7F4E8',
      },
      fontFamily: {
        custom: ['Redressed'],
        clear: ['MuseoModerno'],
      }
    },
  },
  plugins: [],
}

