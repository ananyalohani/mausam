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
      button: '#6E707A',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
