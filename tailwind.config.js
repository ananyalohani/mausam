const colors = require('tailwindcss/colors');

module.exports = {
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Raleway', 'Montserrat', 'Arial'],
      body: ['Fira Sans', 'Lato', 'Roboto'],
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      violet: colors.violet,
      pink: colors.pink,
      primary: '#100E1D',
      primary2: '#191829',
      primary3: '#222134',
      primary4: '#2B2B40',
      secondary: '#1E213A',
      secondaryLight: '#454763',
      subtleAccent: '#5E3A5F',
      darkSubtleAccent: '#4d2f4e',
      brightAccent: '#A6536E',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
