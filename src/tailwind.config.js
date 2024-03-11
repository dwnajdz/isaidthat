/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: 'var(--text)',
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        primary_hover: '#a188bd',
      },
    },
    fontSize: {
      sm: '0.750rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily: {
      heading: 'Poppins',
      body: 'Poppins',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("@nextui-org/react"),
  ],
}
