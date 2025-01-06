import { useState } from "react";
import { useUser } from "../../content/UserContent";
import { deleteItem, updateAvailability } from "../../api/API"; // Assuming these API functions exist

const Name_Price = ({ name, price }) => {
  return (
    <div className="bg-gradient-to-r from-[#ffd000] to-[#ffdf50] p-2 px-8 text-black text-h3 font-bold flex justify-between">
      <div>
        <span className="text-h5 block">Food Name:</span>
        {name || "Special Pizza"}
      </div>
      <div>
        <span className="text-h5 block">Price:</span>
        <p className="flex items-center">
          {price || "888"}
          <span className="ml-1 text-h5">ETB</span>
        </p>
      </div>
    </div>
  );
};

const Image = ({ image }) => {
  return (
    <div className="w-full h-display p-1 pb-0">
      <img
        className="w-full h-full object-cover rounded-t-3xl"
        src={
          image ||
          "https://www.shutterstock.com/image-photo/burger-tomateoes-lettuce-pickles-on-600nw-2309539129.jpg"
        }
        alt="item-image"
      />
    </div>
  );
};

const Description = ({ description }) => {
  return (
    <div className="px-4 py-2">
      <div className="bg-gradient-to-r from-[#ff804e] to-[#fda604] px-3 py-1 rounded-full text-white font-light inline-block">
        Description
      </div>
      <div className="text-h5 text-[#33174C] font-medium mt-2">
        {description || "description"}
      </div>
    </div>
  );
};

const Order = ({ setOrder, props }) => {
  return (
    <button
      className="m-auto w-full bg-gradient-to-br from-[#FFAA00] to-[#FF7300] text-white text-h4 rounded-xl py-2"
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
      const result = await updateAvailability(id, isAvailable);
      console.log(result); // Handle success response
      setIsAvailable((prev) => !prev);
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  return (
    <button
      className={`px-3 ${
        isAvailable ? "text-green-500" : "text-red-500"
      } text-h4 rounded-r-xl rounded-bl-xl py-1 shadow-sm`}
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
        console.log(result); // Log success
        window.location.reload(); // Reload page after deletion
      } catch (error) {
        console.error("Error deleting item:", error);
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
          console.log("Edit mode activated for ID:", id);
          setEdit(id);
        }}
      >
        <img src="https://img.icons8.com/?size=80&id=95043&format=png" />
      </div>
    </div>
  );
};

const DisplayItem = ({ ...props }) => {
  props = props.props;
  const { setOrder, setSelected, setEdit, user } = props;
  const role = user ? user.role : "";

  return (
    <div
      className="m-4 rounded-3xl shadow-xl overflow-hidden bg-white relative h-full"
      onClick={(e) => {
        e.stopPropagation();
        setSelected(null);
        setSelected(props);
      }}
    >
      {role === "ROLE_ADMIN" && <EditButton id={props.id} setEdit={setEdit} />}
      <Image image={props.src} />
      <div className="relative">
        <Name_Price name={props.name} price={props.price} />
        <Description description={props.description} />
        <div className="mt-4 px-4">
          {role !== "ROLE_ADMIN" ? (
            <Order setOrder={setOrder} props={props} />
          ) : (
            <Available id={props.id} available={props.isAvailable} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayItem;
