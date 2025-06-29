import { colors } from "./assets/colors"

/** @type {import('tailwindcss').Config} */

export const content = [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
]
export const presets = [require("nativewind/preset")]
export const darkMode = "class"
export const theme = {
  colors,
  fontSize: {
    "emoji-xs": ["24px", "28px"],
    "emoji-s": ["30px", "34px"],
    "emoji-xl": ["60px", "68px"],
    info: ["14px", "16px"],
    base: ["16px", "18px"],
    title: ["28px", "32px"],
    subtitle: ["20px", "24px"],
  },
  fontFamily: {
    sans: ["Helvetica Neue", "sans-serif"],
  },
  fontWeight: {
    normal: "400",
    semibold: "500",
    bold: "700",
  },
}
export const plugins = []
