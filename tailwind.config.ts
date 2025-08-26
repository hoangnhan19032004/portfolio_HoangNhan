import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: { DEFAULT: "hsl(var(--muted))" },
        border: "hsl(var(--border))",
        primary: { DEFAULT: "hsl(var(--primary))" },
      },
    },
  },
  plugins: [],
};
export default config;
