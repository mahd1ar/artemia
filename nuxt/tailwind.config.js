/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },

    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', 'sans-serif'],
        samim: ['Samim', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#00dacf'
        },
        tm: {
          black: '#151b1f'
        }
      }
    }
  },
  plugins: []
}
