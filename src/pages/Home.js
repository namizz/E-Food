import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import NewItem from "../components/containers/NewItem";
import { useUser } from "../content/UserContent"; // Assuming this is your user context or state management
import { getFood, PersonInfo } from "../api/API"; // Assuming this is your API call
import ItemsBox from "../components/containers/ItemBox";

const Items = () => {
  return (
    <div className="w-[75%] mx-auto">
      <p className="border-[4px] border-[#FF8E32] text-h2 text-[#FF7300] font-semibold inline-block px-item rounded-t-3xl">
        Items
      </p>
      <hr className="relative bottom-1 h-[4px] bg-[#FF8E32]" />
      <div className="border-t-2 border-b-2 border-[#FF8E32] py-4 rounded-xl flex">
        <ItemsBox />
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

const Home = () => {
  const { user } = useUser(); // Assuming useUser gives you the user info from context or state
  const [userInfo, setUserInfo] = useState(null);
  const [addDisplay, setDisplay] = useState("none");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PersonInfo();
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchData();
  }, []);

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
    <div>
      <Header />
      <BackgroundImg />
      <BackgroundImg2 />
      <NavBar changeDisplay={changeDisplay} />
      <NewItem display={addDisplay} />
      <Items />

      {/* Display user info if it's available */}
      {userInfo ? (
        <div className="user-info">
          <p>Name: {userInfo.name}</p>
          <p>Phone Number: {userInfo.phoneNumber}</p>
          <p>Role: {userInfo.role}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Home;
