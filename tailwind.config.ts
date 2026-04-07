import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        "accent-dark": "var(--accent-dark)",
      },
      animation: {
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.3s ease forwards",
        "flip-in": "flipIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "toast-in": "toastIn 0.3s ease forwards",
        "toast-out": "toastOut 0.3s ease forwards",
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        flipIn: {
          "0%": { opacity: "0", transform: "rotateX(-15deg) translateY(-8px)" },
          "100%": { opacity: "1", transform: "rotateX(0deg) translateY(0)" },
        },
        toastIn: {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        toastOut: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(12px) scale(0.96)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
