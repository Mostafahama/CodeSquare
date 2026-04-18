/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'readex': ['Readex Pro', 'IBM Plex Sans Arabic', 'sans-serif'],
      'grotesk': ['Space Grotesk', 'IBM Plex Sans Arabic', 'sans-serif'],
      'inter': ['Inter', 'Alexandria', 'sans-serif'],
    },
    extend: {
      colors: {
        // Dark Palette
        'dark-navy': '#1E1B4B',
        'deep-black': '#030303',
        'dark-purple': '#2D2654',
        // Brand Colors
        'lilac': {
          DEFAULT: '#A855F7',
          50: 'rgba(168, 85, 247, 0.05)',
          100: 'rgba(168, 85, 247, 0.1)',
          200: 'rgba(168, 85, 247, 0.2)',
          300: 'rgba(168, 85, 247, 0.3)',
        },
        'magenta': '#EC4899',
        'gold': '#D4AF37',
        // Text Colors
        'text-primary': '#F8FAFC',
        'text-secondary': '#CBD5E1',
      },
    },
  },
  plugins: [],
}
