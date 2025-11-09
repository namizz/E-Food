import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteItem } from "../api/API";
import { updateAvailability } from "../api/API";
const Name = ({ name, quantity, role, price }) => {
  return (
    <div className="flex justify-between items-center bg-gradient-to-br from-[#ffae6d] to-[#f87f1c] py-2  md:py-1 pl-3 md:pl-5 text-white text-base md:text-h3  font-semibold">
      <div className="flex items-center gap-1 truncate p-2  md:p-1 px-3 md:px-5">
        <span className="truncate">{name || "Special Pizza"}</span>
        {role === "ROLE_ADMIN" && (
          <span className="text-xs md:text-h5 text-[#139219b4] whitespace-nowrap">
            {`(${quantity})`}
          </span>
        )}
      </div>

      <div className="bg-white bg-opacity-70 text-sm md:text-h4 font-bold text-[#4b49be] p-1 md:p-1 rounded-l-2xl pl-2 md:pl-3">
        <p className="flex items-center gap-1">
          <span>{price || "888"}</span>
          <span className="text-xs md:text-h4">ETB</span>
        </p>
      </div>
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

const Desciption = ({ description }) => {
  return (
    <div className="text-h5 text-[#33174C] font-medium px-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
      {description || "description"}
    </div>
  );
};

const Order = ({ user, setOrder, props }) => {
  const navigate = useNavigate(); // Hook to navigate between pages

  const handleOrderClick = (event) => {
    event.stopPropagation();

    // If user is null, redirect to the login page
    if (!user) {
      navigate("/login"); // Replace "/login" with your actual login route
      return;
    }

    // Otherwise, set the order
    setOrder(null);
    setOrder(props);
  };

  return (
    <button
      className="m-auto w-full bg-gradient-to-br from-[#FFAA00] to-[#FF7300] text-white text-h4 rounded-xl py-1"
      onClick={handleOrderClick}
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
    e.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const result = await deleteItem(id);
        console.log(result);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div className="absolute top-2 right-2 md:right-3 flex gap-1 md:gap-2 z-10">
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="w-7 h-7 md:w-8 md:h-8 rounded-full p-1 hover:bg-red-200 transition-shadow shadow-sm"
        aria-label="Delete item"
      >
        <img
          src="https://img.icons8.com/?size=48&id=w2fdYXQKgx1b&format=png"
          alt="delete"
          className="w-full h-full"
        />
      </button>

      {/* Edit Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log("Edit mode for ID:", id);
          setEdit(id);
        }}
        className="w-7 h-7 md:w-8 md:h-8  rounded-full p-1 hover:bg-blue-200 transition-shadow shadow-sm"
        aria-label="Edit item"
      >
        <img
          src="https://img.icons8.com/?size=80&id=95043&format=png"
          alt="edit"
          className="w-full h-full"
        />
      </button>
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
        <Name
          name={props.name}
          quantity={props.quantity}
          role={role}
          price={props.price}
        />
        <Desciption description={props.description} />
        {role !== "ROLE_ADMIN" ? (
          <Order user={user} setOrder={setOrder} props={props} />
        ) : (
          <Available id={props.id} available={props.isAvailable} />
        )}
        {/* <Price price={props.price} /> */}
      </div>
    </div>
  );
};

export default Item;
