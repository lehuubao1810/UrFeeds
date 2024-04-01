/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      translate: {
        "hide-feed": "-20rem",
        "show-feed": "-5rem",
      },
    },
  },
  plugins: [],
}