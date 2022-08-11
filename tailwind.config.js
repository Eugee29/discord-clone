/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      discord: {
        gray: {
          10: '#DCDDDE',
          50: '#96989D',
          100: '#42464D',
          200: '#40444B',
          250: '#3C3F45',
          300: '#36393F',
          400: '#2F3136',
          500: '#32353B',
          600: '#18191C',
        },
      },
    },
    extend: {},
  },
  plugins: [],
}
