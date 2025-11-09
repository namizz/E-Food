import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/API";

const Actions = ({ onEdit, onLogout }) => {
  return (
    <div className="absolute -top-10 right-0 bg-white shadow-lg rounded-md p-2 space-y-2">
      <button
        onClick={onEdit}
        className="w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
      >
        Edit
      </button>
      <button
        onClick={onLogout}
        className="w-full text-left px-3 py-1 text-sm text-red-600 hover:bg-gray-100 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

const Profile = ({ navigate, user }) => {
  const [showButtons, setShowButtons] = useState(false);
  const dropdownRef = useRef(null);

  const toggleButtons = () => setShowButtons((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowButtons(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    alert("Edit clicked");
    setShowButtons(false);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response);
      localStorage.removeItem("auth_token");
      navigate("/login");
    } catch (error) {
      console.log("Can't Log out", error);
    }
    setShowButtons(false);
  };

  return (
    <div
      className="relative flex items-end justify-end gap-3 pr-4 md:pr-6"
      ref={dropdownRef}
    >
      {/* User Name */}
      <div className="text-right">
        {user?.role === "ROLE_ADMIN" && (
          <span className="block text-xs font-light text-orange-700">
            (admin)
          </span>
        )}
        <span className="block text-sm md:text-base font-semibold text-orange-500">
          {user?.name || "Guest"}
        </span>
      </div>

      {/* Profile Image */}
      <div
        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white cursor-pointer overflow-hidden shadow-md"
        onClick={toggleButtons}
      >
        <img
          src="https://i.pinimg.com/736x/60/2e/c8/602ec887941acae80119bf140af76063.jpg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dropdown */}
      {showButtons && <Actions onEdit={handleEdit} onLogout={handleLogout} />}

      {/* Login Button */}
      {!user && (
        <button
          onClick={() => navigate("/login")}
          className="bg-orange-400 hover:bg-orange-500 text-white text-xs md:text-sm font-medium py-1.5 px-3 md:px-4 rounded-lg transition"
        >
          Log In
        </button>
      )}
    </div>
  );
};

const Header = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#ff7e0517] bg-header w-full fixed z-20 flex justify-around items-center ">
      <div className="w-20"></div>
      <p className=" text-[#f77d19] p-3 text-h1 text-center font-bold flex justify-center">
        <img
          src="https://img.icons8.com/?size=48&id=t0CwA6GDizrl&format=png"
          alt="Logo"
          className="w-8 h-8 md:w-10 md:h-10 mx-1 md:mx-2"
        />
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-[#f77d19] tracking-tight">
          E-Food
        </h1>
      </p>
      <Profile navigate={navigate} user={user} />
    </div>
  );
};

export default Header;
