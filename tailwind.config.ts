import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: "2.25rem", // 36px
        h2: "1.875rem", // 30px
        h3: "1.5rem", // 24px
        h4: "1.25rem", // 20px
      },
      fontWeight: {
        h1: "700",
        h2: "600",
        h3: "500",
        h4: "400",
      },
      marginBottom: {
        h1: "1rem", // 16px
        h2: "0.75rem", // 12px
        h3: "0.5rem", // 8px
        h4: "0.25rem", // 4px
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dracula"],
  },
};
export default config;
