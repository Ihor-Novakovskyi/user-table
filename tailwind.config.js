/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: "#1D1E42",
        "light-dark": "#26264F",
        light: "#fff",
        "light-grey": "#f7f6fe",
        peach: "rgba(251, 231, 232, 1)",
        brown: "rgba(163, 13, 17, 1)",
        green: "rgba(31, 146, 84, 1)",
        "light-green": "rgba(235, 249, 241, 1)",
        orange: "rgba(205, 98, 0, 1)",
        "light-orange": "rgba(254, 242, 229, 1)",
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'base': '14px',
        'sm': '12px',
      },
      fontWeight: {
        'medium': 500,
        'semibold': 700,
      },
    },
  },
  plugins: [],
};
