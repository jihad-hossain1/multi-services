import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary_light: "#E9F5DB",
      primary_light_2: "#CFE1B9",
      primary_light_3: "#B5C99A",
      primary_light_4: "#97A97C",
      primary_light_5: "#87986A",
      primary_dark: "#718355",
      primary_dark_deep: "#4F6A2A",
      primary_dark_deep_2: "#2D3B15",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
