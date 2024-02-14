/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-red': '#e42323',
        'custom-gray': '#949494',
        'custom-blue': '#004e98'
      },
    }
  },
  plugins: [],
}

