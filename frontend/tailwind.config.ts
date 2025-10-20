import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // <CHANGE> enable class-based dark mode so we can toggle themes via `document.documentElement.classList`
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};

export default config;
