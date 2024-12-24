import Cart from "../Cart";
import React, { useState, useEffect } from "react";

const CartBox = ({ newOrder }) => {
  const [OrderCart, appendCarts] = useState([]);
  const hashmap = React.useRef(new Map());

  useEffect(() => {
    if (newOrder) {
      const map = hashmap.current;
      // Check if the new order already exists in the hashmap
      if (!map.has(newOrder.id)) {
        // If the newOrder ID is not in the hashmap, add it with quantity 1
        map.set(newOrder.id, 1);

        // Add the new order to the state
        appendCarts((prevOrders) => [
          ...prevOrders,
          {
            id: newOrder.id,
            quantity: 1,
            image: newOrder.src,
            name: newOrder.name,
          },
        ]);
      } else {
        // If the newOrder ID already exists, increment the quantity
        map.set(newOrder.id, map.get(newOrder.id) + 1);

        // Update the existing Cart component's quantity
        appendCarts((prevOrders) =>
          prevOrders.map((cart) =>
            cart.id === newOrder.id
              ? { ...cart, quantity: map.get(newOrder.id) }
              : cart
          )
        );
      }
    }
  }, [newOrder]);
  const updateQuantity = (id, type) => {
    const map = hashmap.current;
    if (map.has(id)) {
      if (type === "increase") map.set(id, map.get(id) + 1);
      else if (type === "decrease" && map.get(id) > 1)
        map.set(id, map.get(id) - 1);
      appendCarts((prevOrders) =>
        prevOrders.map((cart) =>
          cart.id === id ? { ...cart, quantity: map.get(id) } : cart
        )
      );
    }
  };
  const PlaceOrder = () => {
    return newOrder ? (
      <div
        className="bg-orange-400 text-h3 text-center"
        onClick={() => {
          console.log(hashmap);
        }}
      >
        PlaceOrder
      </div>
    ) : null;
  };

  return (
    <div className="fixed right-10 bottom-4 w-cart">
      <div className="flex-col-reverse flex">
        {OrderCart.map((cart) => (
          <Cart
            id={cart.id}
            key={cart.id}
            image={cart.image}
            name={cart.name}
            quantity={cart.quantity}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>
      <PlaceOrder />
    </div>
  );
};

export default CartBox;
