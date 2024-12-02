import React from "react";
import InputBox from "../AddItem";
import Image from "../Image";

const NewItem = () => {
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
  //   const setImgUrlInInfo = (url) => {
  //     setInfo((prev) => ({
  //       ...prev,
  //       img: url,
  //     }));
  //   };
  return (
    <div className="bg-slate-200 flex">
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
    </div>
  );
};

export default NewItem;
