/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.ejs", "./public/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#000000",
          2: "#111111",
          3: "#1a1a1a",
        },
        border: "#2a2a2a",
        primary: {
          DEFAULT: "#ec4899",
          hover: "#db2777",
          soft: "rgba(236, 72, 153, 0.1)",
        },
        text: {
          DEFAULT: "#f5f5f5",
          2: "#a3a3a3",
        },
        code: "#0d0d0d",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        mono: ['"Google Sans Code"', "monospace"],
      },
      borderRadius: {
        DEFAULT: "10px",
      },
    },
  },
  plugins: [],
};
