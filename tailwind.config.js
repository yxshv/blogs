module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'button': '0 0 10px 0.5px rgb(168,85,247), inset 0 0 10px 0.5px rgb(168,85,247)',
      },
    },
  },
  darkMode: 'class',
  plugins: [require("@tailwindcss/typography")],
}
