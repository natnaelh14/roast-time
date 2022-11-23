/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        gray: {
          100: '#fafafa',
          200: '#ececec',
          300: '#cfcfcf',
          400: '#adadad',
          500: '#858585',
          secondary: '#616161',
          primary: '#303030',
          background: {
            dark: '#202224',
          },
        },
        blue: {
          light: '#4B5563',
          primary: '#374151',
          dark: '#253443',
        },
        orange: {
          primary: '#e95858',
          light: '#ffaeae',
          dark: '#ce3636',
        },
        brown: {
          light: '#f5ebe0',
        },
        pink: {
          primary: '#F78888',
        },
        error: '#eb001c',
      },
      height: {
        128: '32rem',
      },
    },
  },
  /* eslint global-require: "off" */
  plugins: [require('flowbite/plugin'), require('@tailwindcss/forms')],
  darkMode: 'class',
};
