const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx,css}',
],
  theme: {
    extend: {
      colors: {
        one: '#162939',
        two: '#3f122f',
        three: '#9f8f99',
        four: '#d4d6d5',
        five: '#dfccc5',
      },
  },
  fontFamily: {
    vango: ['vango'],
  },
  plugins: [],
}
});