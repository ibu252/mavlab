/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          dark: '#0a1929',
          medium: '#1a365d',
          light: '#2d4a7c',
        }
      }
    },
  },
  plugins: [],
}

