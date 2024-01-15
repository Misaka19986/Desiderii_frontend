/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     './index.html',
    './src/**/*.{vue, js, ts, jsx, tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        '1/2': '50%',
        '1/3': '33.333333%',
      }
    },
  },
  plugins: [],
}

