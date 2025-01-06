import React, { useState, useEffect } from "react";
import InputBox from "../AddItem";
import Image from "../Image";
import { getItemById, updateItem } from "../../api/API"; // Assuming AddFood is used for the update API

const UpdateItem = ({ id, editmode }) => {
  const [Info, setInfo] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    quantity: "",
  });
  const [image, setImage] = useState(null);
  const [url, setURL] = useState(null);

  const [required, setRequirement] = useState({
    na: "none",
    pr: "none",
    de: "none",
  });

  // Fetch the item data from the API based on the given `id`
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const data = await getItemById(id);
        setInfo({
          id: data.id,
          name: data.name,
          price: data.price,
          description: data.description,
          quantity: data.quantity,
        });
        setURL(data.imageUrl);
        console.log("INFO", Info);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [id]); // The effect runs when the `id` prop changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Update = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="text-white text-[1em] bg-[#3ea86ef8] py-[0.7em] px-[2em] rounded-xl hover:bg-[#393974]"
      >
        UPDATE
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
      try {
        // Assume the update functionality uses a different API method, for example `UpdateFood`
        const result = await updateItem(Info.id, { id, ...Info }); // Replace with actual update function if different
        console.log(result);
        // window.location.reload();
      } catch (error) {
        console.error("Error while updating food:", error);
      }
      editmode(0);
    }
  };

  const Templete = () => {
    return (
      <div className="p-4 ">
        <div className="w-[400px] bg-white">
          {/* Cart Title */}
          <div className="w-full h-10 flex items-center px-5 border-b border-gray-200 font-bold text-xs text-gray-600">
            Update Item
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
                  {/* <svg
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
                  </svg> */}
                </button>
                <label className="flex items-center justify-center text-sm font-bold text-gray-800">
                  {Info.quantity || "0"}
                </label>
                <button className="flex items-center justify-center text-gray-800">
                  {/* <svg
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
                  </svg> */}
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
      className="flex-col relative top-[20%] left-[25%] mx-auto p-4 pb-10 rounded-md bg-[#ffffff] shadow-lg w-[100%] min-w-[500px]"
      style={{ maxWidth: "600px", margin: "auto" }} // Ensuring center positioning
      onClick={(e) => {
        e.stopPropagation();
      }}
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
        <Image url={url} setImage={setImage} setURL={setURL} />
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
        <Update onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default UpdateItem;
