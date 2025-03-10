import React from "react";
const Image = ({ src }) => {
  return (
    <div className="max-w-[18%] border-[3px] border-white m-1 rounded-full">
      <img
        src={
          src ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3WVxWxsObZR_aIEK0SPcekOKGaRS1r1eRw&s"
        }
        className="object-cover rounded-full h-full w-[90px]"
      />
    </div>
  );
};
const Cancel = ({ cancelItem, id }) => {
  return (
    <button
      className="text-h5 bg-red-500 w-small rounded-lg text-center m-2 mx-5"
      onClick={() => cancelItem(id)}
    >
      cancel
    </button>
  );
};
const ItemNameandCancel = ({ name, cancelItem, id }) => {
  return (
    <div className="w-[55%] p-1 text-white">
      <p className="p-0.5 text-h3">{name || "Ramen"}</p>
      <Cancel cancelItem={cancelItem} id={id} />
    </div>
  );
};
const Quantity = ({ quantity, updateQuantity, id }) => {
  const reduceQuantity = () => {
    return updateQuantity(id, "decrease");
  };
  const addQuantity = () => updateQuantity(id, "increase");
  return (
    <div className="py-[0.4vw]">
      <div className="flex">
        <button
          className="px-3 text-h4 text-red-600 bg-white bg-opacity-60 rounded-lg mr-0.5"
          onClick={reduceQuantity}
        >
          –
        </button>
        <button
          className="px-3 text-h4 text-green-600 bg-white bg-opacity-60 rounded-lg"
          onClick={addQuantity}
        >
          +
        </button>
      </div>
      <div className="m-0.5 p-0.5 text-center text-h4 text-[#ff6943] bg-white bg-opacity-90 rounded-xl">
        {quantity || 2}
      </div>
    </div>
  );
};
const Cart = ({ image, name, quantity, updateQuantity, id, cancelItem }) => {
  return (
    <div className="bg-gradient-to-b from-[#FFC99E] to-[#FF7300] border-2 border-white flex h-cart rounded-full">
      <Image src={image} />
      <ItemNameandCancel name={name} cancelItem={cancelItem} id={id} />
      <Quantity quantity={quantity} id={id} updateQuantity={updateQuantity} />
    </div>
  );
};
export default Cart;
