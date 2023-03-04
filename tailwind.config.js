/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Comfortaa"],
      },
      translate: {
        full1: "105%",
      },
    },
  },
  plugins: [],
};
