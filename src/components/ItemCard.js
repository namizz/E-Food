import { useUser } from "../content/UserContent";

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
    <div className="text-h5 text-[#33174C] font-medium px-4">
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
const Available = () => {
  return (
    <button className="px-3 bg-gradient-to-br text-green-500 text-h4 rounded-r-xl rounded-bl-xl py-1 shadow-sm">
      <span className="text-h5">🟢</span> Available Now
    </button>
  );
};
const EditButton = ({ id, setEdit }) => {
  return (
    <div
      className="w-8 h-8 border-2 border-red-300 absolute right-[5%]"
      onClick={(e) => {
        e.stopPropagation();
        console.log("id print to make edit mode on", id);
        setEdit(id);
      }}
    >
      ✏️
    </div>
  );
};
const Item = ({ user, setEdit, ...props }) => {
  const { setSelected, setOrder } = props;
  const role = user.role !== null ? user.role : "";
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
          <Available />
        )}
        <Price price={props.price} />
      </div>
    </div>
  );
};

export default Item;
