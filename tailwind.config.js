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
      transitionProperty: {
        'width': 'width',
      }
    },
    colors: {
      ...colors,
      'true-dark': {
        100: '#0d0d0d'
      },
      'true-light': {
        100: '#fafafa'
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
