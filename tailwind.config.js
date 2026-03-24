/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ea580c",
        "primary-hover": "#c2410c",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        "meteor": "meteor var(--duration, 8s) var(--delay, 0s) linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "grid": "grid 15s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}