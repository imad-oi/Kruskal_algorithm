/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: [''], // add this line
      colors: {
        vanilla: "#E6E49F",
        black: "#25291C",
        sliver: "#BDC2BF",
        beige: "#E3E7D3",
      },
      
    },
  },
  plugins: [],
};
