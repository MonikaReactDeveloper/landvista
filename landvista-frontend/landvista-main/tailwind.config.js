/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        landvista: {
          // Core Palette
          bg: "#F7F8FA",          // Off-White (Background canvas)
          blue: "#0F2A44",        // Institutional Blue (Dominant)
          charcoal: "#1F2933",    // Charcoal (Dark alt surface / type)
          grey: "#5A6673",        // Governance Grey (Structure / metadata)
          slate: "#3A4F7A",       // Slate Blue (Data / charts / CTA)
          green: "#2E6F5E",       // Policy Green (Proceed / active)
          maroon: "#7A2E2E",      // Legal Maroon (Risk / enforcement)
          alt: "#EEF1F4",         // Alt Section
          
          // Interaction States
          'blue-hover': "#1A3A5A",
          'blue-active': "#0A1F33",
          'green-hover': "#3F8A73",
          'maroon-hover': "#9A3A3A",
        },
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        heading: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
      fontWeight: {
        thin: '100',
        black: '900',
      }
    }
  },
  plugins: [],
}