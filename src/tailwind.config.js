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
    info: ["14px", "18px"],
    base: ["16px", "22px"],
    title: ["28px", "36px"],
    subtitle: ["20px", "28px"],
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
