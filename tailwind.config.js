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
        // Meteor shower
        "meteor": "meteor var(--duration, 8s) var(--delay, 0s) linear infinite",
        // Border beam
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        // Shimmer slide (ShimmerButton)
        "shimmer-slide": "shimmer-slide var(--speed, 3s) ease-in-out infinite alternate",
        // Retro grid scroll
        "grid": "grid 15s linear infinite",
        // Spin around (for shimmer)
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
      },
      keyframes: {
        meteor: {
          "0%": {
            transform: "rotate(215deg) translateX(0)",
            opacity: "1",
          },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        "spin-around": {
          "0%": { transform: "translateZ(0) rotate(0)" },
          "15%, 35%": { transform: "translateZ(0) rotate(90deg)" },
          "65%, 85%": { transform: "translateZ(0) rotate(270deg)" },
          "100%": { transform: "translateZ(0) rotate(360deg)" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}