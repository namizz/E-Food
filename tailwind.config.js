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
    "./src/components/containers/ItemBox.js",
    "./src/components/OrderCard.js",
    "./src/pages/Order.js",
    "./src/components/containers/CartBox.js",
    "./src/components/Cart.js",
    "./src/components/container/Notification.js",
    "./src/components/NotificationCard.js",
  ],
  theme: {
    extend: {
      width: {
        cardL: "clamp(10px, 25vw, 300px)",
        cart: "clamp(250px, 33vw, 420px)",
      },
      height: {
        cardH: "clamp(10px, 14vw, 170px)",
        display: "clamp(10px, 25vw, 270px)",
        cart: "clamp(57px,7.2vw,85px)",
      },
      spacing: {
        price: "clamp(10px, 10vw, 110px)",
        small: "clamp(10px, 9vw, 95px)",
        profile: "clamp(10px, 7vw, 75px)",
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
        hm: "clamp(10px,1.25vw, 16px)",
        notif: "clamp(5px,0.8vw,12px)",
      },
      backgroundImage: {
        yellowGradient: "linear-gradient(to top-right, #ffd900, #ffdd00)",
        sent: "linear-gradient(to right, #95F551 0%, #95F551 7%, transparent 7%, #fff 100%)",
        accepted:
          "linear-gradient(to right, #95F551 0%, #95F551 28%, transparent 28%, #fff 100%)",
        preparing:
          "linear-gradient(to right, #95F551 0%, #95F551 50%, transparent 50%, #fff 100%)",
        ready:
          "linear-gradient(to right, #95F551 0%, #95F551 72%, transparent 72%, #fff 100%)",
        delivered:
          "linear-gradient(to right, #95F551 0%, #95F551 100%, transparent 100%, #fff 100%)",
      },
    },
  },
  plugins: [],
};
