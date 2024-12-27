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

const Items = ({ setSelected, selected, setOrder }) => {
  return (
    <div className={`${selected ? "w-[55%]" : "w-[75%] mx-auto"} `}>
      <p className="border-[4px] border-[#FF8E32] text-h2 text-[#FF7300] font-semibold inline-block px-item rounded-t-3xl">
        Items
      </p>
      <hr className="relative bottom-1 h-[4px] bg-[#FF8E32]" />
      <div className="border-t-2 border-b-2 border-[#FF8E32] py-4 rounded-xl flex">
        <ItemsBox setSelected={setSelected} setOrder={setOrder} />
      </div>
    </div>
  );
};

const BackgroundImg2 = () => {
  return (
    <div className="absolute z-[-10] opacity-10 w-full">
      <img
        className="h-[100vh] w-full object-fill"
        src="https://i.pinimg.com/736x/f5/d9/f8/f5d9f8c8c418b21f002c51bbff5823fa.jpg"
      />
    </div>
  );
};

const BackgroundImg = () => {
  return (
    <div className="absolute z-[-10] opacity-75 w-full">
      <img
        className="h-[100vh] w-full object-cover"
        src="https://i.pinimg.com/736x/d2/a7/b8/d2a7b8e3626b849ed5b81e58625cae4d.jpg"
      />
    </div>
  );
};

const UserInfo = ({ user }) => {
  return (
    <div>
      {user ? (
        <div className="user-info">
          <p>Name: {user.name}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

const Body = ({ setSelected, selected, setOrder }) => {
  return (
    <div className="flex mx-auto justify-center">
      <Items
        setSelected={setSelected}
        selected={selected}
        setOrder={setOrder}
      />
      {selected ? (
        <div className="w-[25%] border-2 border-red-300">
          <DisplayItem props={selected} />
        </div>
      ) : null}
    </div>
  );
};

const Home = () => {
  const { user, setUser } = useUser(); // About user
  const [addDisplay, setDisplay] = useState("none"); // About new food
  const [selected, setSelected] = useState(null); // About selected element
  const [newOrder, setOrder] = useState(null);
  const [notifications, setNotifications] = useState([]); //notifications

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PersonInfo();
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
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

  // Ensure `user` is loaded and `user.role` is available before rendering the component
  if (!user) {
    return <p>Loading...</p>; // Optionally, show a loading spinner here
  }

  return (
    <div
      className=""
      onClick={() => {
        setSelected(null);
      }}
    >
      <Header />
      <BackgroundImg />
      <BackgroundImg2 />
      <NavBar
        selected={addDisplay}
        changeDisplay={changeDisplay}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      {/* Only render Notifications if user is loaded and has the role */}
      {user.role && user.role === "ROLE_ADMIN" ? (
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
        />
      ) : (
        ""
      )}
      <NewItem display={addDisplay} />
      <Body selected={selected} setSelected={setSelected} setOrder={setOrder} />
      <UserInfo user={user} setOrder={setOrder} />
      <CartBox newOrder={newOrder} />
    </div>
  );
};

export default Home;
