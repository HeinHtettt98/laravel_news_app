/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bodyy: ["DM Sans", "sans-serif"],
        headingg: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
};
