import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": {
            transform: "translate(0px, 0px) rotate(-45deg)",
            opacity: "1",
          },
          "70%": { opacity: "1" },
          "100%": {
            transform: "translate(-400px, 400px) rotate(-45deg)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
