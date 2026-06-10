import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f6f1e8",
        pearl: "#fbfaf6",
        harbor: {
          50: "#f3f8f8",
          100: "#d7e9e8",
          300: "#7eb8b5",
          600: "#2f6f6b",
          900: "#173b3a"
        },
        tide: {
          50: "#f7fbfb",
          100: "#e8f2f1",
          300: "#9bc6c2",
          700: "#255a57"
        },
        sand: {
          50: "#fbf6ed",
          100: "#f3e5cf",
          300: "#d7b37c",
          600: "#9b6a2f"
        },
        terracotta: {
          50: "#fff4ef",
          100: "#ffe1d4",
          300: "#e79a79",
          600: "#c75f3f",
          700: "#aa4a2f"
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 59, 58, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
