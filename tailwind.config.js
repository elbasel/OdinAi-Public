/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
  safelist: [
    "slide-in-from-left",
    "slide-in-from-right",
    "slide-in-from-top",
    "slide-in-from-bottom",
  ],
};
