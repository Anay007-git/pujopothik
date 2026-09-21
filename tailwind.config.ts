import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sindoor: {
          50: "#fdf2f2",
          100: "#fde8e8",
          200: "#fbd5d5",
          300: "#f8b4b4",
          400: "#f98080",
          500: "#e02424",
          600: "#c5221f",
          700: "#9b1b1b",
          800: "#771d1d",
          900: "#551414",
          DEFAULT: "#9b1b1b",
        },
        terracotta: {
          50: "#fbf6f0",
          100: "#f6ece1",
          200: "#ecdbc3",
          300: "#dfc19c",
          400: "#cca171",
          500: "#ba834c",
          600: "#a36c3e",
          700: "#865434",
          800: "#6e452e",
          900: "#5a3a28",
          DEFAULT: "#c05621",
        },
        pujaWhite: {
          DEFAULT: "#faf7ee",
          light: "#fdfbf7",
          dark: "#f2ece0",
        },
        charcoal: {
          50: "#27272a",
          100: "#202023",
          200: "#1a1a1d",
          300: "#161619",
          DEFAULT: "#121215",
          deep: "#0a0a0c",
        },
        festiveGold: {
          DEFAULT: "#d4af37",
          light: "#f3e5ab",
          dark: "#aa820a",
        },
      },
      fontFamily: {
        bengali: ["'Noto Serif Bengali'", "'Noto Sans Bengali'", "serif"],
        bengaliSans: ["'Noto Sans Bengali'", "sans-serif"],
        serif: ["'Playfair Display'", "'Cinzel'", "Georgia", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "alpana-pattern": "radial-gradient(circle, rgba(155, 27, 27, 0.05) 1px, transparent 1px)",
        "night-gradient": "linear-gradient(to bottom, #0a0a0c 0%, #161619 50%, #121215 100%)",
        "festive-gradient": "linear-gradient(135deg, #9b1b1b 0%, #c05621 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

