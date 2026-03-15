/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bgi-navy':    '#024879',
        'bgi-orange':  '#E0712A',
        'bgi-crimson': '#C12035',
        'bgi-peach':   '#FDD49F',
        'bgi-midblue': '#42769B',
        'bgi-ltblue':  '#81A3BC',
      },
    },
  },
  plugins: [],
}
