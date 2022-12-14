/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      ginto: ['ABC Ginto Normal', ...defaultTheme.fontFamily.sans],
      ['ginto-nord']: ['ABC Ginto Nord', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontFamily: {
        sans: ['Whitney', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        discord: {
          gray: {
            10: '#DCDDDE',
            20: '#B9BBBE',
            30: '#A3A6AA',
            50: '#96989D',
            60: '#72767D',
            100: '#42464D',
            200: '#40444B',
            250: '#3C3F45',
            300: '#36393F',
            400: '#2F3136',
            500: '#32353B',
            550: '#292B2F',
            560: '#23272A',
            600: '#18191C',
          },
          blue: {
            100: '#00AFF4',
            200: '#5865F2',
            250: '#4752C4',
          },
          red: {
            100: '#F38688',
            200: '#D83C3E',
          },
        },
      },
    },
    screens: {
      sm: '470px',
      md: '800px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
