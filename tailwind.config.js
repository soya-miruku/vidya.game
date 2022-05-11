const colors = require('tailwindcss/colors')

module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
  ],
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './react-bricks/**/*.tsx',
    './node_modules/react-bricks-ui/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            margin: '0 auto',
            padding: '0',
            'max-width': '100%',
            'color': colors.gray['100'],
            h1: {
              'font-weight': 900,
              'font-size': '80px',
              'line-height': '80px',
              'text-transform': 'uppercase',
              'margin-top': 0,
            },
            h2: {
              'font-weight': 900,
              'font-size': '60px',
              'line-height': '60px',
              'text-transform': 'uppercase',
              'margin-top': 0,
            },
            h3: {
              'font-weight': 900,
              'font-size': '45px',
              'line-height': '45px',
              'text-transform': 'uppercase',
              'margin-top': 0,
            },
            h4: {
              'font-weight': 900,
              'font-size': '32px',
              'line-height': '32px',
              'text-transform': 'uppercase',
              'margin-top': 0,
            },
            h5: {
              'font-weight': 900,
              'font-size': '20px',
              'line-height': '20px',
              'text-transform': 'uppercase',
              'margin-top': 0,
            },
            h6: {
              'font-weight': 900,
              'font-size': '14px',
              'line-height': '14px',
              'text-transform': 'uppercase',
              'margin-top': 0,
            },
            p: {
              'font-size': '14px',
              'line-height': '22px',
              'letter-spacing': '2px',
              'margin-top': 0,
              'margin-bottom': 0,
            }
          }
        }
      },
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
