/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.jsx'
  ],
  theme: {
    extend: {
      textStrokeWidth: {
        1: "1px",
        2: "2px",
      },
      textStrokeColor: {
        white: "#FFFFFF",
      }
    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-stroke")
  ],
}