module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#002F6C', // Dark blue from Hybrid Financial
        accent: '#FFD700',  // Golden accent color
      },
    },
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure Tailwind scans all your components
  ],
  plugins: [],
};
