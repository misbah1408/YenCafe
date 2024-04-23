/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        equal: "0 0 20px 1px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
