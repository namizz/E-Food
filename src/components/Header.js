import { useState } from "react";
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

  const toggleButtons = () => {
    setShowButtons((prev) => !prev);
  };

  const handleEdit = () => {
    alert("Edit clicked");
    // Add your edit logic here
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log("Can't Log out");
    }

    // Add your logout logic here
  };

  return (
    <div className="relative">
      <p className="absolute bottom-2 right-36 font-semibold">
        {user && user.role == "ROLE_ADMIN" ? (
          <span className="block font-light text-orange-300">(admin)</span>
        ) : (
          ""
        )}
        <span className="text-orange-500">{user && user.name}</span>
      </p>
      <div
        className="absolute w-profile h-profile rounded-full border-2 border-white bottom-2 right-16 cursor-pointer"
        onClick={toggleButtons}
      >
        <img
          className="rounded-full h-profile w-profile object-fill"
          src="https://i.pinimg.com/736x/60/2e/c8/602ec887941acae80119bf140af76063.jpg"
          alt="Profile"
        />
      </div>
      {showButtons && <Actions onEdit={handleEdit} onLogout={handleLogout} />}
    </div>
  );
};

const Header = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#ff7e0517] w-full">
      <p className="text-[#f77d19] p-3 text-h1 text-center font-bold">E-Food</p>
      <Profile navigate={navigate} user={user} />
    </div>
  );
};

export default Header;
