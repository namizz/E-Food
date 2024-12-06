/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/ItemCard.js",
    "./src/index.js",
    "./src/components/Header.js",
    "./src/components/NavBar.js",
    "./src/components/AddItem.js",
    "./src/components/Image.js",
    "./src/pages/Home.js",
    "./src/components/containers/NewItem.js",
    "./src/components/LogInInputs.js",
    "./src/pages/LogIn.js",
  ],
  theme: {
    extend: {
      width: {
        cardL: "clamp(10px, 25vw, 300px)",
      },
      height: {
        cardH: "clamp(10px, 14vw, 170px)",
      },
      spacing: {
        price: "clamp(10px, 10vw, 110px)",
      },
      backgroundImage: {
        header: "linear-gradient(135deg, #FF9B4A, #FF7300)",
      },
      padding: {
        item: "clamp(10px, 8vw, 100px)",
      },
      fontSize: {
        h1: "clamp(10px,3vw, 43px)",
        h2: "clamp(10px,2.3vw, 30px)",
        h3: "clamp(10px, 2vw, 23px)",
        h4: "clamp(10px, 1.4vw, 18px)",
        h5: "clamp(10px, 1.1vw, 14px)",
      },
    },
  },
  plugins: [],
};
