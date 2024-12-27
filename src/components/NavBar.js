import { useNavigate, useLocation } from "react-router-dom";
const HomeBar = ({ changeDisplay, selected }) => {
  return <li onClick={selected !== "none" ? changeDisplay : null}>Home</li>;
};
const OrderBar = ({ navigate, notifications, setNotifications }) => {
  const location = useLocation();
  return (
    <li
      onClick={() => {
        if (location.pathname !== "/order") {
          navigate("/order");
          setNotifications([]);
          localStorage.setItem("notifications", JSON.stringify([]));
        }
      }}
    >
      {notifications.length > 0 ? (
        <div
          className={` bg-red-500 absolute text-notif ml-[1.9vw] -mt-[0.3vw] text-white min-w-5 text-center ${
            notifications ? "rounded-full" : "rounded-md"
          }`}
        >
          {notifications.length || "new"}
        </div>
      ) : null}
      Order
    </li>
  );
};
const NewFood = ({ changeDisplay }) => {
  return (
    <li
      className="bg-[#33174C] text-white rounded-lg text-h5 p-1"
      onClick={changeDisplay}
    >
      New Food
    </li>
  );
};

const NavBar = ({
  changeDisplay,
  notifications,
  setNotifications,
  selected,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-row-reverse mx-[-10%] p-3">
      <div className="border-2 border-[#250045] w-[25vw] 2xl:w-[20vw] rounded-2xl">
        <ul className="flex justify-between font-semibold text-[#4E0092] p-0.5 px-[2vw] 2xl:px-[3vw] text-h4">
          <HomeBar changeDisplay={changeDisplay} selected={selected} />
          <OrderBar
            navigate={navigate}
            notifications={notifications}
            setNotifications={setNotifications}
          />
          <NewFood changeDisplay={changeDisplay} />
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
