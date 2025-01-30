/** @type {import('tailwindcss').Config} */
import daisyui from "./node_modules/daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  fontFamily: {
    playfair: ['Playfair Display','Georgia', 'serif'],
    sourceSans: ['Source Sans Pro', 'sans-serif'],
    montserrat: ['Montserrat', 'sans-serif'],
    smooch: ['Smooch Sans', 'sans-serif'],
  },
  plugins: [daisyui],
}

