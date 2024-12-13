import React from "react";
import InputBox from "../AddItem";
import Image from "../Image";
import { AddFood } from "../../api/API";

const NewItem = ({ display }) => {
  const [Info, setInfo] = React.useState({
    name: "",
    price: "",
    description: "",
  });
  const [image, setImage] = React.useState(null);

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

  const AddButton = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="text-white text-[1em] bg-[#3ea86ef8] py-[0.7em] px-[2em] rounded-xl hover:bg-[#393974]"
      >
        ADD
      </button>
    );
  };

  const requiredUnfilled = () => {
    let isValid = true;
    const updateRequirement = { ...required };

    for (let key in Info) {
      if (!Info[key]) {
        const prefix = key.slice(0, 2); // Extract 'na', 'pr', etc.
        if (prefix in required) {
          updateRequirement[prefix] = "flex"; // Show error
        }
        isValid = false;
      } else {
        const prefix = key.slice(0, 2);
        if (prefix in required) {
          updateRequirement[prefix] = "none"; // Hide error
        }
      }
    }

    setRequirement(updateRequirement);
    return isValid; // Return form validity
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the required fields are filled
    if (requiredUnfilled()) {
      const formData = new FormData();
      formData.append("name", Info.name); // Add name field
      formData.append("price", Info.price); // Add price field
      formData.append("description", Info.description); // Add description field
      formData.append("quantity", 1); // Set quantity field (you can adjust this based on your needs)

      if (image) {
        formData.append("image", image); // Add image file field
      }

      console.log("FormData being sent:", formData);

      try {
        const result = await AddFood(formData); // Send the formData to the backend
        console.log(result);
      } catch (error) {
        console.error("Error while posting food:", error);
      }
    }
  };

  return (
    <div
      className="flex-col w-[40%] ml-[20%] border-t-2 border-[#358f6c69] mb-6 pb-2 rounded-3xl rounded-tl-none bg-[#8f971d07]"
      style={{ display: display }}
    >
      <div className="flex">
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
      </div>
      <div className="flex">
        <InputBox
          name="description"
          type="textbox"
          p="Description"
          value={Info.description}
          change={handleChange}
          display={required.de}
        />
        <Image setImage={setImage} />
        {image && (
          <img src={image} alt="Uploaded" className="mt-4 max-w-full" />
        )}
      </div>
      <div className="w-full mx-12">
        <AddButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default NewItem;
