/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#c9a86a', weak: '#fdf6e3', dark: '#8c7348' },
        ink: '#1a1a1a',
        muted: '#7a756f'
      },
      borderRadius: { card: '12px', control: '8px' }
    }
  },
  plugins: []
}
