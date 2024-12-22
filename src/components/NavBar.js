import { useNavigate } from "react-router-dom";

const NavBar = ({ changeDisplay }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-row-reverse mx-[-10%] p-3">
      <div className="border-2 border-[#250045] w-[25vw] 2xl:w-[20vw] rounded-2xl">
        <ul className="flex justify-between font-semibold text-[#4E0092] p-0.5 px-[2vw] 2xl:px-[3vw] text-h4">
          <li onClick={changeDisplay}>Home</li>
          <li onClick={() => navigate("/order")}>Order</li>
          <li
            className="bg-[#33174C] text-white rounded-lg text-h5 p-1"
            onClick={changeDisplay}
          >
            New Food
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
