/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'primary': '#0a1527',
        'secondary': '#31dda4',
      },
      fontFamily: {
        'cursive': ["'Great Vibes', cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
}

