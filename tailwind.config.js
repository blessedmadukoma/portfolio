// tailwind.config.js
const config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.{js,vue,ts}",
    "./pages/**/*.{js,vue,ts}",
    "./plugins/**/*.{js,ts}",
    "./app.{js,vue,ts}",
    "./error.{js,vue,ts}",
    "./app/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#0A092C",
        secondary: "#64748b",
        accent: "#f59e42",
        background: "#f8fafc",
        foreground: "#0f172a",
        muted: "#e2e8f0",
        white: "#ffffff",
        black: "#000000",
      },
    },
  },
  plugins: [],
};

export default config;
