/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#F0EFEA',
        'secondary-bg': '#FFFFFF',
        'accent': {
          DEFAULT: '#6D28D9',
          light: '#9333EA',
          dark: '#5B21B6',
        },
        'text-primary': '#111827',
        'text-secondary': '#374151',
        'border-color': '#E5E7EB',
      }
    },
  },
  plugins: [],
};