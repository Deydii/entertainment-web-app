/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      blue: {
        200: "5A698F",
        700: "161D2F",
        900: "10141E",
      },
      red: "#FC4747",
      white: "#FFFFFF",
    },
    fontSize: {
      xs: ['13px', {
        lineHeight: '16px',
        fontWeight: '300'
      }],
      sm: ['15px', {
        lineHeight: '19px',
        fontWeight: '500'
      }],
      base: ['16px', {
        lineHeight: '20px',
        fontWeight: '300'
      }],
      lg: ['18px', {
        lineHeight: '23px',
        fontWeight: '500'
      }],
      xl : ['24px', {
        lineHeight: '3Opx',
        fontWeight: '300'
      }],
      '2xl': ['32px', {
        lineHeight: '40px',
        fontWeight: '300'
      }]
    },
    extend: {},
  },
  plugins: [],
};
