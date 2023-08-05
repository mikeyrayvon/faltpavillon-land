module.exports = {
  mode: "jit",
  content: ["./components/**/*.tsx", "./pages/**/*.tsx", "./utils/types.ts"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "sans-serif"],
        serif: ["Libre Baskerville", "Times New Roman", "Times", "serif"],
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [require("@tailwindcss/forms")],
};
