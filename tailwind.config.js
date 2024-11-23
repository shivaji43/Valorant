/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zentry:['zentry', 'sanf-serif'],
        general:['general', 'sanf-serif'],
        'circular-web':['circular-web', 'sanf-serif'],
        'robert-medium':['robert-medium', 'sanf-serif'], 
        'robert-regular':['robert-regular', 'sanf-serif'],
      },
      colors:{
        red:{
          50:'#e84651',
        },
        blue:{
          50:'#0F1923',
        },
        yellow:{
          50:'#EDFF66'
        },
      }
    },
  },
  plugins: [],
}

