import React from "react";
import InputBox from "../AddItem";
import Image from "../Image";
import { AddFood } from "../../api/API";

const NewItem = ({ display }) => {
  const [Info, setInfo] = React.useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
  });
  const [image, setImage] = React.useState(null);
  const [url, setURL] = React.useState(null);

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
      formData.append(
        "quantity",
        parseInt(Info.quantity) > 1 ? parseInt(Info.quantity) : 0
      ); // Set quantity field (you can adjust this based on your needs)

      if (image) {
        formData.append("image", image); // Add image file field
        console.log(URL.createObjectURL(image));
      }

      console.log("FormData being sent:", formData);

      try {
        const result = await AddFood(formData); // Send the formData to the backend
        console.log(result);
        window.location.reload();
      } catch (error) {
        console.error("Error while posting food:", error);
      }
    }
  };

  const Templete = () => {
    return (
      <div className="p-4">
        <div className="w-[400px] bg-white">
          {/* Cart Title */}
          <div className="w-full h-10 flex items-center px-5 border-b border-gray-200 font-bold text-xs text-gray-600">
            New Item
          </div>

          {/* Products Section */}
          <div className="p-4">
            <div className="grid grid-cols-[60px_1fr_80px_1fr] gap-3 items-center">
              {/* Product Image */}
              <img
                src={
                  url ||
                  "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="
                }
                className="w-16 h-16 object-cover rounded-md"
                alt="productage"
              />

              {/* Product Details */}
              <div>
                <span className="text-sm font-semibold text-gray-800 block mb-1">
                  {Info.name || "No name"}
                </span>
                <p className="text-xs font-semibold text-gray-500">
                  {Info.description || "no description"}
                </p>
              </div>

              {/* Quantity Controller */}
              <div className="grid grid-cols-3 items-center bg-white border border-gray-300 rounded-md shadow-sm">
                <button className="flex items-center justify-center text-gray-800">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      stroke="#47484b"
                      d="M20 12L4 12"
                    ></path>
                  </svg>
                </button>
                <label className="flex items-center justify-center text-sm font-bold text-gray-800">
                  {Info.quantity || "0"}
                </label>
                <button className="flex items-center justify-center text-gray-800">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      stroke="#47484b"
                      d="M12 4V20M20 12H4"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* Price */}
              <div className="text-sm font-bold text-gray-800 text-right">
                ${Info.price || "0"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex-col  mx-[20%] mb-6 pb-2 rounded-md  bg-[#ffffff7a] shadow-lg "
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
        <Image setImage={setImage} setURL={setURL} />
        {url && (
          <img
            src={url}
            alt="Uploaded"
            className="mt-4 ml-[-4em] max-w-full w-40 h-40 rounded-2xl object-cover"
          />
        )}
      </div>
      <div>
        <InputBox
          name="quantity"
          p="Quantity"
          value={Info.quantity}
          change={handleChange}
        />
      </div>
      <Templete />
      <div className="w-full mx-12">
        <AddButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default NewItem;
