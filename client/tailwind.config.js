/** @type {import('tailwindcss').Config} */
export default {
  // This is the magic line that enables the manual toggle
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}