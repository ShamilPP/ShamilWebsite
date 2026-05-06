/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: {
          0: "#000000",
          50: "#06060a",
          100: "#0a0a10",
          200: "#101018",
          300: "#16161f",
          400: "#1d1d28",
        },
        mist: "#e7e7ea",
        glow: "#9bd0ff",
        accent: "#c8ff00",
        accent2: "#00d4ff",
      },
    },
  },
  plugins: [],
};
