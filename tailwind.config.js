module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "576px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1400px",
    },
    extend: {
      fontFamily: {
        'kiwi': ['Kiwi Maru'],
        'zen' : ['Zen Loop']
      },
      colors: {
        primary: {
          "orange": "#FD9800",
          "thinOrange": "#FFC56D",
          "darkGreen": "#184212",
          "green": "#006D4D",
          "brown": "#5A3600",
          "skin": "#FFF5E1",
        }
      }
    },
  },
  plugins: [],
}