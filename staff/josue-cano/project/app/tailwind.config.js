/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "emerald",
      {
        ekoality: {
            primary: "#52a42d",

            secondary: "#8bbc74",

            accent: "#a4a4a4",

            neutral: "#E8E8E8",

            "base-100": "#fdfdfd",

            info: "#ffd700",

            success: "#00ff00",

            warning: "#0f140f",

            error: "#ff0000",
        },
      },
    ],
  },
};
