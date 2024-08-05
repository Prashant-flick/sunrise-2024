/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        light:{
          1: "#F3F6F8",
        },
        blue:{
          1: "#1890FF",
        },
        gray:{
          1: "#F5F5F5",
          2: "#D9D9D9",
          3: "#00000040",
        },
        black:{
          1: "#00000073",

        }
      }
    }
  }
}

