/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",
        accentpink: "var(--accent-color-pink)",
        accentgreen: "var(--accent-color-green)",
        accentred: "var(--accent-color-red)",
      },
      fontFamily: {
        logo: ["Lobster", "cursive"],
        body: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}
