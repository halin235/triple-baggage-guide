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
        triple: {
          blue: "#3182F6",
          "blue-soft": "#E8F3FF",
        },
        point: {
          red: "#FF4B4B",
          "red-soft": "#FFECEC",
        },
        ink: "#1A1A1A",
        muted: "#8B95A1",
        line: "#D1D6DB",
        card: "#F9FAFB",
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
      keyframes: {
        "check-pop": {
          "0%": { transform: "scale(0.35)", opacity: "0.5" },
          "55%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "step-in": {
          "0%": { opacity: "0", transform: "translateX(14px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "check-pop": "check-pop 0.32s cubic-bezier(0.34, 1.3, 0.64, 1) forwards",
        "step-in": "step-in 0.38s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
