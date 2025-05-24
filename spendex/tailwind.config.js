/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          600: "#5071b3",
          650: "#374f7f",
          700: "#28395c",
        },
        background: {
          DEFAULT: "#F9FAFB",
          dark: "#111827",
        },
        text: {
          DEFAULT: "#111827",
          dark: "#F3F4F6",
        },
        card: {
          light: "#FFFFFF",
          dark: "#1F2937",
        },
        border: {
          light: "#E5E7EB",
          dark: "#374151",
        },
      },
    },
  },
  plugins: [],
}
