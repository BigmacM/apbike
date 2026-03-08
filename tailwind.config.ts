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
        ocean: {
          DEFAULT: "#00a8cc",
          light: "#33bcda",
          dark: "#0090b0",
        },
        sunset: {
          DEFAULT: "#ff8c42",
          light: "#ffa566",
          dark: "#e67530",
        },
        sand: {
          DEFAULT: "#f4f1ea",
          dark: "#e8e3d8",
        },
        palm: "#2d6a4f",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        display: ["Montserrat", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(0,0,0,0.08)",
        card: "0 8px 40px -8px rgba(0,168,204,0.15)",
        glow: "0 0 40px rgba(0,168,204,0.25)",
      },
      backgroundImage: {
        "gradient-ocean": "linear-gradient(135deg, #00a8cc 0%, #0090b0 100%)",
        "gradient-sunset": "linear-gradient(135deg, #ff8c42 0%, #e67530 100%)",
        "gradient-hero":
          "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.55) 100%)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
