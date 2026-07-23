/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        pinky: {
          50: '#fef6f6', 100: '#fde8e8', 200: '#fbd5d5',
          300: '#f8b4b4', 400: '#f58b8e', 500: '#e86a6e',
          600: '#d44a4f', 700: '#b23a3e', 800: '#933337', 900: '#7a2d31',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  },
  plugins: [],
}
