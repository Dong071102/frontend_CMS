/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#088247',
        second: '#0d955c',
        white: '#ffff',
      }
    },

  },
  plugins: [],
}