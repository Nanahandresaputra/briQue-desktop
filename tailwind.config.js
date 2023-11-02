/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        lg: "1025px",
      },
      fontFamily: {
        "open-sans": "Open Sans",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
