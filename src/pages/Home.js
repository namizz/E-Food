import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import NewItem from "../components/containers/NewItem";
import { useUser } from "../content/UserContent"; // Assuming this is your user context or state management
import { getFood, PersonInfo } from "../api/API"; // Assuming this is your API call
import ItemsBox from "../components/containers/ItemBox";
import DisplayItem from "../components/DisplayItem";
import CartBox from "../components/containers/CartBox";
import Notifications from "../components/containers/Notification";
import { useNavigate } from "react-router-dom";
import UpdateItem from "../components/containers/UpdateItem";
import Report from "../components/Report";
import { BackgroundImg, BackgroundImg2 } from "../components/Background";

// import OrderNotification from "../components/containers/OrderNotification";

const Items = ({
  user,
  setSelected,
  selected,
  setOrder,
  setEdit,
  editmode,
}) => {
  return (
    <div
      className={`${selected ? "w-[55%]" : "w-[75%] mx-auto"} 
      `}
    >
      <p className="border-[4px] border-[#FF8E32] text-h2 text-[#FF7300] font-semibold inline-block px-item rounded-t-3xl">
        Items
      </p>
      <hr className="relative bottom-1 h-[4px] bg-[#FF8E32]" />
      <div className="border-t-2 border-b-2 border-[#FF8E32] py-4 rounded-xl flex">
        <ItemsBox
          user={user}
          setSelected={setSelected}
          setOrder={setOrder}
          setEdit={setEdit}
        />
      </div>
    </div>
  );
};

const Body = ({ user, setSelected, selected, setOrder, editmode, setEdit }) => {
  return (
    <div
      className={`flex mx-auto justify-center ${
        editmode !== 0 ? "blur-sm" : null
      }`}
    >
      <Items
        setSelected={setSelected}
        selected={selected}
        setOrder={setOrder}
        user={user}
        setEdit={setEdit}
        editmode={editmode}
      />
      {selected ? (
        <div className="w-[25%] border-2 border-red-300">
          <DisplayItem user={user} props={selected} />
        </div>
      ) : null}
    </div>
  );
};

const Home = ({ addDisplay, setDisplay }) => {
  const { user, setUser } = useUser();
  const [selected, setSelected] = useState(null); // About selected element
  const [newOrder, setOrder] = useState(null);
  const [notifications, setNotifications] = useState([]); //notifications
  const [OrdNotify, setOrdNotify] = useState([]);
  const [editmode, setEdit] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PersonInfo();
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        navigate("/login");
      }
    };
    fetchData();
  }, [setUser]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        console.log(await getFood());
      } catch (error) {
        console.log("Can't fetch food");
      }
    };
    fetchFood();
  }, []);

  const changeDisplay = () => {
    console.log("clicked new item");
    setDisplay((prevDisplay) => (prevDisplay === "none" ? "block" : "none"));
  };

  return (
    <div
      className={`${
        editmode !== 0
          ? "w-full h-[100vh] bg-orange-300 bg-opacity-50 backdrop-blur-lg"
          : null
      }`}
      onClick={() => {
        if (editmode !== 0) {
          setEdit(0);
        } else {
          setSelected(null);
        }
      }}
    >
      <Header user={user} setUser={setUser} />
      <BackgroundImg />
      <BackgroundImg2 />
      <NavBar
        selected={addDisplay}
        changeDisplay={changeDisplay}
        notifications={notifications}
        setNotifications={setNotifications}
        user={user}
      />
      {
        user && user.role === "ROLE_ADMIN" ? (
          <>
            <div className="flex items-center justify-center w-full">
              <Report />
            </div>
            <Notifications
              notifications={notifications}
              setNotifications={setNotifications}
            />
            <NewItem display={addDisplay} />
          </>
        ) : (
          ""
        )
        //  (
        //   <>
        //     <OrderNotification
        //       ordNotify={OrdNotify}
        //       setOrdNotify={setOrdNotify}
        //       user={user}
        //     ></OrderNotification>
        //   </>
        // )
      }
      <Body
        user={user}
        selected={selected}
        setSelected={setSelected}
        setOrder={setOrder}
        setEdit={setEdit}
        editmode={editmode}
      />
      {editmode ? (
        <div
          className="fixed top-[25%] right-[40%] mx-20"
          onClick={() => setEdit(0)}
        >
          <UpdateItem id={editmode} editmode={setEdit} />
        </div>
      ) : null}
      <CartBox newOrder={newOrder} />
    </div>
  );
};

export default Home;
