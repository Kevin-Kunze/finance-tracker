import { colors } from "./assets/colors"

/** @type {import('tailwindcss').Config} */

export const content = [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
]
export const presets = [require("nativewind/preset")]
export const darkMode = "class"
export const theme = {
  extend: {
    colors,
  },
}
export const plugins = []
