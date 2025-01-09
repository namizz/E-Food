import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const HomeBar = ({
  changeDisplay,
  selected,
  navigate,
  isActive,
  setActive,
}) => {
  const location = useLocation();

  return (
    <li
      className={`cursor-pointer ${
        isActive && location.pathname === "/"
          ? "bg-[#33174C] text-white rounded-lg px-1 py-0.5"
          : ""
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
  OrdNotify,
  setOrdNotify,
  isActive,
  setActive,
  user,
}) => {
  const location = useLocation();
  return (
    <li
      className={`cursor-pointer ${
        location.pathname === "/order"
          ? "bg-[#33174C] text-white rounded-lg px-1 py-0.5"
          : ""
      }`}
      onClick={() => {
        setActive("order"); // Update activeTab immediately
        if (location.pathname !== "/order" && notifications) {
          if (user && user.role === "ROLE_ADMIN") {
            setNotifications([]);
            localStorage.setItem("notifications", JSON.stringify([]));
          } else {
            setOrdNotify([]);
            localStorage.setItem("Onotifications", JSON.stringify([]));
          }
          navigate("/order"); // Navigate after updating state
        }
      }}
    >
      {user && user.id === "ROLE_ADMIN" ? (
        // If user is admin, show notifications
        notifications && notifications.length > 0 ? (
          <div
            className={`bg-red-500 absolute text-notif ml-[1.9vw] -mt-[0.3vw] text-white min-w-5 text-center ${
              notifications ? "rounded-full" : "rounded-md"
            }`}
          >
            {notifications.length || "new"}
          </div>
        ) : null
      ) : // If user is not admin, show OrdNotify
      OrdNotify && OrdNotify.length > 0 ? (
        <div
          className={`bg-red-500 absolute text-notif ml-[1.9vw] -mt-[0.3vw] text-white min-w-5 text-center ${
            OrdNotify ? "rounded-full" : "rounded-md"
          }`}
        >
          {OrdNotify.length || "new"}
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
  const location = useLocation();
  return (
    <li
      className={`cursor-pointer ${
        location.pathname === "/past-orders"
          ? "bg-[#33174C] text-white rounded-lg px-1 py-0.5"
          : ""
      }`}
      onClick={() => {
        setActive("pastOrders");
        navigate("/past-orders");
      }}
    >
      History
    </li>
  );
};

const NavBar = ({
  changeDisplay,
  notifications,
  setNotifications,
  selected,
  user,
  OrdNotify,
  setOrdNotify,
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
            user={user}
            navigate={navigate}
            notifications={notifications || null}
            setNotifications={setNotifications || null}
            OrdNotify={OrdNotify || null}
            setOrdNotify={setOrdNotify || null}
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
