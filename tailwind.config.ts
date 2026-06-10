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
        paper: "#f7f1e7",
        pearl: "#fbfaf6",
        harbor: {
          50: "#eef2f8",
          100: "#cfdaec",
          300: "#5a7ba8",
          600: "#b88a45",
          900: "#0b2547"
        },
        tide: {
          50: "#f4f7fc",
          100: "#dde6f3",
          300: "#d9b97a",
          700: "#14385f"
        },
        sand: {
          50: "#fbf6ed",
          100: "#f3e5cf",
          300: "#d9b97a",
          600: "#9b6a2f"
        },
        terracotta: {
          50: "#fbf3e5",
          100: "#f3e5cf",
          300: "#d9b97a",
          600: "#9b6f33",
          700: "#b88a45"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"],
        serif: ["var(--font-serif)", '"Cormorant Garamond"', "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 14px 38px rgba(11, 37, 71, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
