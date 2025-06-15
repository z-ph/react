/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // 禁用Tailwind的base/reset样式
  },
  theme: {
    extend: {},
  },
  plugins: [],
}