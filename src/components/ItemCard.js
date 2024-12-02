const Item = () => {
  return (
    <div className="w-cardL relative m-2 mx-4 rounded-t-3xl">
      <div className="w-cardL h-cardH ">
        <img
          className="w-full object-cover rounded-t-3xl"
          src="https://www.shutterstock.com/image-photo/burger-tomateoes-lettuce-pickles-on-600nw-2309539129.jpg"
          alt="item-image"
        />
      </div>
      <div className="relative">
        <div className="bg-gradient-to-br from-[#ffae6d] to-[#f87f1c] p-1 text-white text-h3 px-5 font-semibold">
          Special Pizza
        </div>
        <div className="text-h5 text-[#33174C] font-medium px-4">
          description
        </div>
        <button className="m-auto w-full bg-gradient-to-br from-[#FFAA00] to-[#FF7300] text-white text-h4 rounded-xl py-1">
          Order
        </button>
        <div className="relative bottom-price right-[-70%] bg-white bg-opacity-40 text-h4 font-bold text-[#7c49be] p-1 rounded-l-2xl pl-3">
          <p>
            888<span className="text-h5">ETB</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
