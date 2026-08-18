/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.ejs", "./public/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#ffffff",
          2: "#f7f7f8",
          3: "#f1f1f3",
        },
        border: "#e6e6e9",
        primary: {
          DEFAULT: "#ec4899",
          hover: "#db2777",
          soft: "rgba(236, 72, 153, 0.08)",
        },
        text: {
          DEFAULT: "#161616",
          2: "#6b7280",
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
