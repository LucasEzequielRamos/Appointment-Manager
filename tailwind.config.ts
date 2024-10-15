import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
     themes: [
       {
         mytheme: {
           primary: "#4f46e5",
           secondary: "#7973F0",
           accent: "#7F7E9B",
           neutral: "#e0e7ff",
           "base-100": "#1f2937",
           info: "#3b82f6",
           success: "#53DC2B",
           warning: "#F58747",
           error: "#F04E41",
         },
       },
     ],
  },
};
export default config;
