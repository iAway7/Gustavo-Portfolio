import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#ffffff",
        panel: "#f6f6f2",
        panelSoft: "#efeee8",
        line: "rgba(23, 23, 23, 0.14)",
        text: "#171717",
        muted: "#555555",
        accent: "#171717"
      },
      boxShadow: {
        float: "0 18px 42px rgba(23, 23, 23, 0.06)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"]
      },
      letterSpacing: {
        display: "-0.05em"
      },
      maxWidth: {
        shell: "88rem"
      }
    }
  },
  plugins: []
};

export default config;
