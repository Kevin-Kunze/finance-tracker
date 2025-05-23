/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#FBBF24",
        accent: "#F472B6",
        background: "#F9FAFB",
        text: "#111827",
      },
    },
  },
  plugins: [],
}
