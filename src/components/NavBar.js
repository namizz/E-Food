import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const HomeBar = ({
  changeDisplay,
  selected,
  navigate,
  isActive,
  setActive,
}) => {
  return (
    <li
      className={`cursor-pointer ${
        isActive ? "bg-[#33174C] text-white rounded-lg px-1 py-0.5" : ""
      }`}
      onClick={() => {
        if (selected && selected !== "none") {
          changeDisplay();
        }
        setActive("home");
        navigate("/");
      }}
    >
      Home
    </li>
  );
};

const OrderBar = ({
  navigate,
  notifications,
  setNotifications,
  isActive,
  setActive,
}) => {
  const location = useLocation();
  return (
    <li
      className={`cursor-pointer ${
        isActive ? "bg-[#33174C] text-white rounded-lg px-1 py-0.5" : ""
      }`}
      onClick={() => {
        setActive("order"); // Update activeTab immediately
        if (location.pathname !== "/order" && notifications) {
          setNotifications([]);
          localStorage.setItem("notifications", JSON.stringify([]));
          navigate("/order"); // Navigate after updating state
        }
      }}
    >
      {notifications && notifications.length > 0 ? (
        <div
          className={`bg-red-500 absolute text-notif ml-[1.9vw] -mt-[0.3vw] text-white min-w-5 text-center ${
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

const NewFood = ({ changeDisplay, isActive, setActive, disabled }) => {
  return (
    <li
      className={`cursor-pointer ${
        isActive ? "bg-[#33174C] text-white rounded-lg px-1 py-0.5" : ""
      } ${disabled ? "cursor-not-allowed text-gray-400" : ""}`}
      onClick={() => {
        if (!disabled) {
          setActive("newFood");
          changeDisplay();
        }
      }}
    >
      New Food
    </li>
  );
};

const PastOrdersBar = ({ navigate, isActive, setActive }) => {
  return (
    <li
      className={`cursor-pointer ${
        isActive ? "bg-[#33174C] text-white rounded-lg px-1 py-0.5" : ""
      }`}
      onClick={() => {
        setActive("pastOrders");
        navigate("/past-orders");
      }}
    >
      Past Orders
    </li>
  );
};

const NavBar = ({
  changeDisplay,
  notifications,
  setNotifications,
  selected,
  user,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home"); // Track the active tab

  return (
    <div className="w-full flex flex-row-reverse mx-[-10%] p-3">
      <div className="border-2 border-[#250045] w-[25vw] 2xl:w-[20vw] rounded-2xl">
        <ul className="flex justify-between font-semibold text-[#4E0092] p-0.5 px-[2vw] 2xl:px-[3vw] text-h4">
          <HomeBar
            changeDisplay={changeDisplay}
            selected={selected}
            navigate={navigate}
            isActive={activeTab === "home"}
            setActive={setActiveTab}
          />
          <OrderBar
            navigate={navigate}
            notifications={notifications || null}
            setNotifications={setNotifications || null}
            isActive={activeTab === "order"}
            setActive={setActiveTab}
          />
          {user && user.role === "ROLE_ADMIN" ? (
            <NewFood
              changeDisplay={changeDisplay}
              isActive={activeTab === "newFood"}
              setActive={setActiveTab}
              disabled={location.pathname === "/order"}
            />
          ) : (
            <PastOrdersBar
              navigate={navigate}
              isActive={activeTab === "pastOrders"}
              setActive={setActiveTab}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
