/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        surface: '#1D1D1D',
        primary: {
          DEFAULT: '#1DB954',
          50: '#E3F8E9',
          100: '#C7F2D3',
          200: '#8DE6A8',
          300: '#53D97C',
          400: '#1DB954',
          500: '#169C46',
          600: '#107F38',
          700: '#0B622A',
          800: '#06451C',
          900: '#02280E',
        },
        secondary: '#535353',
        accent: {
          DEFAULT: '#B3B3B3',
          light: '#FFFFFF',
          dark: '#7F7F7F',
        },
        error: '#E91429',
        warning: '#F59B23',
        success: '#1DB954',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}