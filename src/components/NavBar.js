/* NavBar.jsx – original desktop UI + mobile hamburger */
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

/* ── Menu items (exact copy of your original code) ─────────────────── */
const HomeBar = ({
  changeDisplay,
  selected,
  navigate,
  isActive,
  setActive,
  onClose, // <-- new optional prop for mobile
}) => {
  const location = useLocation();

  const handleClick = () => {
    if (selected && selected !== "none") changeDisplay();
    setActive("home");
    navigate("/");
    onClose?.();
  };

  return (
    <li
      className={`cursor-pointer ${
        isActive && location.pathname === "/"
          ? "bg-[#33174C] text-white rounded-lg px-1 py-0.5"
          : ""
      }`}
      onClick={handleClick}
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
  onClose,
}) => {
  const location = useLocation();

  const handleClick = () => {
    setActive("order");
    if (location.pathname !== "/order" && (notifications || OrdNotify)) {
      if (user && user.role === "ROLE_ADMIN") {
        setNotifications([]);
        localStorage.setItem("notifications", JSON.stringify([]));
      } else {
        setOrdNotify([]);
        localStorage.setItem("Onotifications", JSON.stringify([]));
      }
    }
    navigate("/order");
    onClose?.();
  };

  return (
    <li
      className={`cursor-pointer ${
        location.pathname === "/order"
          ? "bg-[#33174C] text-white rounded-lg px-1 py-0.5"
          : ""
      }`}
      onClick={handleClick}
    >
      {user && user.role === "ROLE_ADMIN" ? (
        notifications && notifications.length > 0 ? (
          <div
            className={`bg-red-500 absolute text-notif ml-[1.9vw] -mt-[0.3vw] text-white min-w-5 text-center ${
              notifications ? "rounded-full" : "rounded-md"
            }`}
          >
            {notifications.length || "new"}
          </div>
        ) : null
      ) : OrdNotify && OrdNotify.length > 0 ? (
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

const NewFood = ({ changeDisplay, isActive, setActive, disabled, onClose }) => {
  const handleClick = () => {
    if (!disabled) {
      setActive("newFood");
      changeDisplay();
      onClose?.();
    }
  };

  return (
    <li
      className={`cursor-pointer ${
        isActive ? "bg-[#33174C] text-white rounded-lg px-1 py-0.5" : ""
      } ${disabled ? "cursor-not-allowed text-gray-400" : ""}`}
      onClick={handleClick}
    >
      New Food
    </li>
  );
};

const PastOrdersBar = ({ navigate, isActive, setActive, onClose }) => {
  const location = useLocation();

  const handleClick = () => {
    setActive("pastOrders");
    navigate("/past-orders");
    onClose?.();
  };

  return (
    <li
      className={`cursor-pointer ${
        location.pathname === "/past-orders"
          ? "bg-[#33174C] text-white rounded-lg px-1 py-0.5"
          : ""
      }`}
      onClick={handleClick}
    >
      History
    </li>
  );
};

/* ── Main NavBar ─────────────────────────────────────────────────── */
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
  const [activeTab, setActiveTab] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen((v) => !v);
  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      {/* ── Desktop – **EXACT** original markup ── */}
      <div className="hidden md:block w-full flex flex-row-reverse p-3 pt-20">
        <div className="border-2 border-[#250045] w-[25vw] 2xl:w-[20vw] rounded-2xl mx-auto ">
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

      {/* ── Mobile – Hamburger dropdown ── */}
      <div className="md:hidden flex justify-end p-4 pt-20">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-[#4E0092]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {mobileOpen && (
          <div className="absolute top-20 right-4 bg-white border-2 border-[#250045] rounded-2xl shadow-lg z-50">
            <ul className="flex flex-col items-center gap-2 p-2 font-semibold text-[#4E0092]">
              <HomeBar
                changeDisplay={changeDisplay}
                selected={selected}
                navigate={navigate}
                isActive={activeTab === "home"}
                setActive={setActiveTab}
                onClose={closeMenu}
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
                onClose={closeMenu}
              />
              {user && user.role === "ROLE_ADMIN" ? (
                <NewFood
                  changeDisplay={changeDisplay}
                  isActive={activeTab === "newFood"}
                  setActive={setActiveTab}
                  disabled={location.pathname === "/order"}
                  onClose={closeMenu}
                />
              ) : (
                <PastOrdersBar
                  navigate={navigate}
                  isActive={activeTab === "pastOrders"}
                  setActive={setActiveTab}
                  onClose={closeMenu}
                />
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
