import { useUser } from "../content/UserContent";

const Name_Price = ({ name, price }) => {
  return (
    <div className="bg-gradient-to-tr from-[#ffd900] to-[#ffdd00] p-2 text-black text-h3 font-semibold flex justify-between">
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
    <div className="w-full h-display p-1">
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
      <div className="bg-gradient-to-tr from-[#FF771D] to-[#FF9C5B] px-5 py-2 rounded-md text-white font-semibold">
        Description
      </div>
      <div className="text-h5 text-[#33174C] font-medium mt-2">
        {description || "description"}
      </div>
    </div>
  );
};

const Order = () => {
  return (
    <button
      className="m-auto w-full bg-gradient-to-br from-[#FFAA00] to-[#FF7300] text-white text-h4 rounded-xl py-2"
      aria-label="Order this item"
    >
      Order
    </button>
  );
};

const Available = () => {
  return (
    <button
      className="px-3 bg-gradient-to-br from-green-200 to-green-500 text-green-800 text-h4 rounded-r-xl rounded-bl-xl py-1 shadow-sm"
      aria-label="Available now"
    >
      <span className="text-h5">🟢</span> Available Now
    </button>
  );
};

const EditButton = () => {
  return (
    <div
      className="w-8 h-8 border-2 border-red-300 absolute right-[5%] top-[5%] rounded-full bg-white flex items-center justify-center shadow-md"
      aria-label="Edit item"
    >
      ✏️
    </div>
  );
};

const DisplayItem = ({ props }) => {
  const { user } = useUser();
  const role = user.role || "";

  return (
    <div className="m-4 rounded-3xl border-2 border-red-600 shadow-lg overflow-hidden bg-white relative">
      <EditButton />
      <Image image={props.src} />
      <div className="relative">
        <Name_Price name={props.name} price={props.price} />
        <Description description={props.description} />
        <div className="mt-4 px-4">
          {role !== "ROLE_ADMIN" ? <Order /> : <Available />}
        </div>
      </div>
    </div>
  );
};

export default DisplayItem;
