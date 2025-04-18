/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        "regal-blue": "#f4e2de",
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', "sans-serif"],
        cinzel: ["Cinzel", "serif"],
        lobster: ["Lobster", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
