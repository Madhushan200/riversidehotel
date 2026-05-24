/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        river: {
          dark: '#031422',
          blue: '#072B49',
          light: '#0b3d68',
          accent: '#0e528c',
        },
        gold: {
          light: '#f5d68b',
          DEFAULT: '#D9A441',
          dark: '#a8781e',
        },
        royal: '#FFFFFF',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
