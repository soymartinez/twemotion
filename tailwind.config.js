/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple-dark': '#080619',
        'gray-dark': '#3b3948',
      }
    },
  },
  plugins: [],
}
