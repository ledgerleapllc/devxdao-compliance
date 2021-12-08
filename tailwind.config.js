const plugin = require('tailwindcss/plugin')

const paddingCard = '2.1875rem';

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxs: '0.5625rem'
      },
      width: {
        '500px': '500px',
        50: '12.5rem',
        '7/10': '70%',
      },
      borderRadius: {
        '4xl': '2rem'
      },
      colors: {
        primary: '#5BDD88',
        secondary: '#130427',
        red: '#EA5454',
        purple: '#722ED1',
        gray1: '#646464',
        gray2: '#9B9B9B',
        gray3: '#E3E3E3',
        white1: '#F4F7F6'
      },
      padding: {
        '12.5': '3.125rem',
        'card': paddingCard,
        'tracker': `calc(${paddingCard} - 7px)`,
      },
      margin: {
        '-card': `-${paddingCard}`,
      },
      height: {
        'tab' : 'calc(100% + 2.5rem)',
        'm-content': 'min-content'
      },
      maxHeight: {
        card: '1000px',
        '160': '40rem'
      }
    },
  },
  variants: {
    extend: {
      height: ['important'],
      width: ['important'],
      maxWidth: ['important'],
      maxHeight: ['important'],
      borderRadius: ['important'],
      padding: ['important'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    plugin(function({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`
          rule.walkDecls(decl => {
            decl.important = true
          })
        })
      })
    }),
  ],
}