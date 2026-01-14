import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Couleurs KB-COM par service
      colors: {
        // Couleurs principales
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // Sites Internet - Bleu
        "service-web": {
          light: "#3b82f6",
          dark: "#6366f1",
        },
        // SEO - Vert
        "service-seo": {
          light: "#10b981",
          dark: "#059669",
        },
        // Applications - Violet
        "service-app": {
          light: "#8b5cf6",
          dark: "#d946ef",
        },
        // Automatisation - Orange
        "service-auto": {
          light: "#f59e0b",
          dark: "#f97316",
        },
      },
      // Font Geist
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      // Dégradés personnalisés
      backgroundImage: {
        // Dégradés par service
        "gradient-web": "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
        "gradient-seo": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        "gradient-app": "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
        "gradient-auto": "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
        // Dégradé principal KB-COM
        "gradient-primary": "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      },
    },
  },
  plugins: [typography],
};

export default config;
