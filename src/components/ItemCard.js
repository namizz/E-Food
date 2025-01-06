import { useState } from "react";
import { deleteItem } from "../api/API";
import { updateAvailability } from "../api/API";
const Name = ({ name }) => {
  return (
    <div className="bg-gradient-to-br from-[#ffae6d] to-[#f87f1c] p-1 text-white text-h3 px-5 font-semibold">
      {name || "Special Pizza"}
    </div>
  );
};
const Image = ({ image }) => {
  return (
    <div className="w-cardL h-cardH ">
      <img
        className="w-full h-cardH object-cover rounded-t-3xl"
        src={
          image ||
          "https://www.shutterstock.com/image-photo/burger-tomateoes-lettuce-pickles-on-600nw-2309539129.jpg"
        }
        alt="item-image"
      />
    </div>
  );
};
const Price = ({ price }) => {
  return (
    <div className="relative bottom-price right-[-70%] bg-white bg-opacity-40 text-h4 font-bold text-[#7c49be] p-1 rounded-l-2xl pl-3">
      <p>
        {price || "888"}
        <span className="text-h5">ETB</span>
      </p>
    </div>
  );
};
const Desciption = ({ description }) => {
  return (
    <div className="text-h5 text-[#33174C] font-medium px-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
      {description || "description"}
    </div>
  );
};
const Order = ({ setOrder, props }) => {
  return (
    <button
      className="m-auto w-full bg-gradient-to-br from-[#FFAA00] to-[#FF7300] text-white text-h4 rounded-xl py-1"
      onClick={(event) => {
        event.stopPropagation();
        setOrder(null);
        setOrder(props);
      }}
    >
      Order
    </button>
  );
};
const Available = ({ id, available }) => {
  const [isAvailable, setIsAvailable] = useState(available);

  const handleToggleAvailability = async (e) => {
    e.stopPropagation();
    try {
      // Call your API to update availability
      const result = await updateAvailability(id, isAvailable);
      console.log(result); // Handle success message or response accordingly

      // Toggle local state
      setIsAvailable((prev) => !prev); // Toggle availability
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };
  return (
    <button
      className={`px-3 ${
        isAvailable ? "text-green-500 " : "text-red-500"
      }text-h4 rounded-r-xl rounded-bl-xl py-1 shadow-sm`}
      onClick={handleToggleAvailability}
    >
      <span className="text-h5">{isAvailable ? "🟢" : "🔴"}</span>{" "}
      {isAvailable ? "Available Now" : "Unavailable Now"}
    </button>
  );
};

const EditButton = ({ id, setEdit }) => {
  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        const result = await deleteItem(id); // Call the delete function with the item ID
        console.log(result); // Log success message or handle it accordingly
        window.location.reload(); // Reload the page after deletion
      } catch (error) {
        console.error("Error deleting item:", error); // Handle any errors that occur
      }
    }
  };
  return (
    <div>
      <div
        className="w-6 h-6 absolute top-1 right-[16%]"
        onClick={handleDelete}
      >
        <img src="https://img.icons8.com/?size=48&id=w2fdYXQKgx1b&format=png" />
      </div>
      <div
        className="w-8 h-8 absolute right-[5%]"
        onClick={(e) => {
          e.stopPropagation();
          console.log("id print to make edit mode on", id);
          setEdit(id);
        }}
      >
        <img src="https://img.icons8.com/?size=80&id=95043&format=png" />
      </div>
    </div>
  );
};
const Item = ({ ...props }) => {
  const { setSelected, setOrder, setEdit, user } = props;
  const role = user !== null ? user.role : "";
  return (
    <div
      className="w-cardL relative m-2 mx-4 rounded-3xl"
      onClick={(e) => {
        e.stopPropagation();
        setSelected(null);
        setSelected(props);
      }}
    >
      {role === "ROLE_ADMIN" ? (
        <EditButton setEdit={setEdit} id={props.id} />
      ) : null}
      <Image image={props.src} />
      <div className="relative">
        <Name name={props.name} />
        <Desciption description={props.description} />
        {role !== "ROLE_ADMIN" ? (
          <Order setOrder={setOrder} props={props} />
        ) : (
          <Available id={props.id} available={props.isAvailable} />
        )}
        <Price price={props.price} />
      </div>
    </div>
  );
};

export default Item;
