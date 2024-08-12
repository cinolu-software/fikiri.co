module.exports = {
  content: ['./src/**/*.{html,ts}', '../src/dist/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        hero: 'url("/images/hero.webp")'
      }
    },
    fontFamily: {
      general: ['General Sans', 'sans-serif']
    }
  },
  plugins: []
};
