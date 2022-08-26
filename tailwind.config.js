const { url } = require('node:inspector');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        close: "url(/images/close.png)"
      },
      colors: {
        gray: {
          100: "#fafafa",
          200: "#ececec",
          300: "#cfcfcf",
          400: "#adadad",
          500: "#858585",
          secondary: "#616161",
          primary: "#303030",
        },
        orange: {
          primary: "#e95858",
          light: "#ffaeae",
          dark: '#ce3636'
        },
        brown: {
          light: '#f5ebe0'
        },
        pink: {
          primary: '#F78888'
        },
        error: "#eb001c",
      }
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("@tailwindcss/forms"),
  ],
}