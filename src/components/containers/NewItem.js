import React from "react";
import InputBox from "../AddItem";
import Image from "../Image";

const NewItem = ({ display }) => {
  const [Info, setInfo] = React.useState({
    name: "",
    price: "",
    description: "",
    img: "",
  });

  const [required, setRequirement] = React.useState({
    na: "none",
    pr: "none",
    de: "none",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const AddButton = () => {
    return (
      <button className="text-white text-[1em] bg-[#2c2c5a] py-[0.7em] px-[2em] rounded-xl hover:bg-[#393974]">
        ADD
      </button>
    );
  };
  //   const setImgUrlInInfo = (url) => {
  //     setInfo((prev) => ({
  //       ...prev,
  //       img: url,
  //     }));
  //   };
  return (
    <div
      className={`flex-col transform opacity-0 transition-all duration-500 ease-in-out ${
        display === "block"
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
      style={{ display: display }}
    >
      <InputBox
        name="name"
        p="Item Name"
        value={Info.name}
        change={handleChange}
        display={required.na}
      />
      <InputBox
        name="price"
        p="Price"
        value={Info.price}
        change={handleChange}
        display={required.pr}
      />
      <InputBox
        name="description"
        p="Description"
        value={Info.description}
        change={handleChange}
        display={required.de}
      />
      <Image />
      <AddButton />
    </div>
  );
};

export default NewItem;
