/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '450px',
      sm: '640px',

      md: '768px',

      lg: '1024px',

      xl: '1250px',

      '2xl': '1450px',
    },
  },
  plugins: [],
}
