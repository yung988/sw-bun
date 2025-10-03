import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sand: "#f8f6f2",
        graphite: "#0f172a",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Georgia", "Times New Roman", "serif"],
      },
      maxWidth: {
        container: '1250px',
      },
      boxShadow: {
        'soft': '0 10px 20px -10px rgba(15, 23, 42, 0.15)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        xl: "var(--radius-xl)",
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
};

export default config;
