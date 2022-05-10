const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './react-bricks/**/*.tsx',
    './node_modules/react-bricks-ui/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      letterSpacing: {
        'high-wide': '2px'
      },
      fontFamily: {
        'saria': ['Saira Semi Condensed', 'Roboto'],
        'nunito': ['Nunito', 'Roboto'],
        'poppins': ['Poppins', 'sans-serif'] 
      },
      transitionProperty: {
        'width': 'width',
        'margin': 'margin',
      }
    },
    boxShadow: {
      'l-sm': '4px 5px 80px rgba(0, 0, 0, 0.5)'
    },
    colors: {
      ...colors,
      'primary': {
        '100': '#651AB7',
      },
      'true-dark': {
        100: '#0d0d0d',
        200: '#11081F',
        300: '#211436'
      },
      'true-light': {
        100: '#fafafa',
        200: '#FAFBFF'
      },
      'accent-dark': {
        100: '#d3aaff',
        200: '#c574e8',
        700: '#734a9e',
        800: '#651AB7'
      },
      'accent-light': {
        100: '#c7cfff'
      }
    }
  },
}
