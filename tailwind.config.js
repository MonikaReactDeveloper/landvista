/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // 👈 THIS IS REQUIRED
  ],
// tailwind.config.js
theme: {
  extend: {
  colors: {
        landvista: {
          bg: "#F7F8FA",          // Off-White
          blue: "#0F2A44",        // Institutional Blue
          charcoal: "#1F2933",    // Content
          grey: "#5A6673",        // Governance Grey
          slate: "#3A4F7A",       // Intelligence
          green: "#2E6F5E",       // Validation
          maroon: "#7A2E2E",      // Risk
            muted: "#9CA3AF",
        },
      },
       fontFamily: {
      sans: ["Inter", "sans-serif"], // default
      heading: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
    },
  }
},
  plugins: [],
}