/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:      "#2E7D32",
        "primary-light": "#388E3C",
        "primary-dark":  "#1B5E20",
        accent:       "#66BB6A",
        surface:      "#FFFFFF",
        background:   "#F5F7F5",
        "sidebar-bg": "#1B5E20",
        "text-primary":   "#1A1A1A",
        "text-secondary": "#6B7280",
        "text-muted":     "#9CA3AF",
        error:        "#D32F2F",
        warning:      "#F57C00",
        "card-border": "#E5E7EB",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
      },
    },
  },
  plugins: [],
};