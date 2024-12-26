/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        color_backgroundGrey: 'var(--color-background-grey)',
        color_lightGrey: 'var(--color-light-grey)',
        color_Grey: 'var(--color-grey)',
        color_strongGrey: 'var(--color-strong-grey)',
        color_darkBlue: 'var(--color-dark-blue)',
        color_darkBlue2: 'var(--color-dark-blue2)',
        color_lightBlue: 'var(--color-light-blue)',
        color_green: 'var(--color-green)',
        color_greenMedium: 'var(--color-green-medium)',
        color_greenDark: 'var(--color-green-dark)',
        color_softRed: 'var(--color-soft-red)',
        color_softYellow: 'var(--color-soft-yellow)',
      }
    },
  },
  plugins: [],
}

/* theme: {
  extend: {
    colors: {
      fondo: 'var(--color-fondo)',
      amarilloCanario: 'var(--color-yellow)'
    },
  },
  plugins: [],
}


--color-background-grey: #D1D8D8;
--color-white: #ffffff;
--color-light-grey: #F4F4F9;
--color-grey: #EAEDED;
--color-middle-grey: #BDC3C7;
--color-strong-grey: #353C40;
--color-dark-blue: #2C3E50;
--color-dark-blue2: #34495E;
--color-light-blue: #5DADE2;
--color-green: #27AE60;
--color-green-medium: #229954;
--color-green-dark: #229954;
--color-soft-red: #E74C3C;
--color-soft-yellow: #D8D853; */