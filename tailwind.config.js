/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#D6D6D6",
        "primary-200": "#828282",
        "primary-300": "#404040",
        "primary-800": "#131A2B",
        "primary-900": "#0A101F",

        "accent-100": "#DAD449",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
