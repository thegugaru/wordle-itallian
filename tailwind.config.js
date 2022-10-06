const iOSHeight = require('@rvxlab/tailwind-plugin-ios-full-height');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
      // ... your plugins
      iOSHeight,
  ],
};
