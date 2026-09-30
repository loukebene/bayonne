import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jardin: {
          dark: "#041710",
          primary: "#062319",
          surface: "#0b3b2b",
          card: "#0e4a36",
          border: "#175c44",
          orange: {
            DEFAULT: "#E85D04",
            hover: "#FF6B00",
            light: "#FF8533",
            glow: "rgba(232, 93, 4, 0.25)",
          },
          gold: "#D4AF37",
          cream: "#FAF8F5",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(to bottom, rgba(6,35,25,0.75), rgba(4,23,16,0.95))",
      },
    },
  },
  plugins: [],
};
export default config;
