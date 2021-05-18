module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Raleway', 'Montserrat', 'Arial'],
      body: ['Fira Sans', 'Lato', 'Roboto'],
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#100E1D',
      secondary: '#1E213A',
      subtleAccent: '#5E3A5F',
      brightAccent: '#A6536E',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
