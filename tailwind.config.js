/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      theme: {
  extend: {
    colors: {
      neon: '#B9FD50',
    },
    backdropBlur: {
      md: '12px',
    }
  },
}

    },
  },
  plugins: [],
}