module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#19346B',
        primarylight: '#2C4A8A', // Dark blue from Hybrid Financial
        accent: '#FFD700',  // Golden accent color
        black: '#34495e',
        clouds: '#ecf0f1'
      },
    },
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure Tailwind scans all your components
  ],
  plugins: [],
};
