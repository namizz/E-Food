import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import NewItem from "../components/containers/NewItem";
import { useUser } from "../content/UserContent"; // Assuming this is your user context or state management
import { getFood, PersonInfo } from "../api/API"; // Assuming this is your API call
import ItemsBox from "../components/containers/ItemBox";
import DisplayItem from "../components/DisplayItem";

const Items = ({ setSelected, selected }) => {
  return (
    <div className={`${selected ? "w-[55%]" : "w-[75%] mx-auto"}  border-2`}>
      <p className="border-[4px] border-[#FF8E32] text-h2 text-[#FF7300] font-semibold inline-block px-item rounded-t-3xl">
        Items
      </p>
      <hr className="relative bottom-1 h-[4px] bg-[#FF8E32]" />
      <div className="border-t-2 border-b-2 border-[#FF8E32] py-4 rounded-xl flex">
        <ItemsBox setSelected={setSelected} />
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

const Body = ({ setSelected, selected }) => {
  return (
    <div className="flex mx-auto justify-center">
      <Items setSelected={setSelected} selected={selected} />
      {selected ? (
        <div className="w-[25%] border-2 border-red-300">
          <DisplayItem props={selected} />
        </div>
      ) : null}
    </div>
  );
};
const Cart = () => {
  return (
    <div className="bg-gradient-to-b from-[#FFC99E] to-[#FF7300] border-2 border-white flex h-cart rounded-full">
      <div className="max-w-[18%] border-[3px] border-white m-1 rounded-full">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3WVxWxsObZR_aIEK0SPcekOKGaRS1r1eRw&s"
          className="object-cover rounded-full h-full w-full"
        />
      </div>
      <div className="w-[55%] p-1 text-white">
        <p className="p-0.5 text-h3">Noodles</p>
        <div className="text-h5 bg-red-500 w-small rounded-lg text-center m-2 mx-5">
          cancel
        </div>
      </div>
      <div className="py-[0.4vw]">
        <div className="flex">
          <div className="px-3 text-h4 text-red-600 bg-white bg-opacity-60 rounded-lg mr-0.5">
            –
          </div>
          <div className="px-3 text-h4 text-green-600 bg-white bg-opacity-60 rounded-lg">
            +
          </div>
        </div>
        <div className="m-0.5 p-0.5 text-center text-h4 text-[#ff6943] bg-white bg-opacity-90 rounded-xl">
          2
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { user, setUser } = useUser();
  const [addDisplay, setDisplay] = useState("none");
  const [selected, setSelected] = useState(null);
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

  return (
    <div className="">
      <Header />
      <BackgroundImg />
      <BackgroundImg2 />
      <NavBar changeDisplay={changeDisplay} />
      <NewItem display={addDisplay} />
      <Body selected={selected} setSelected={setSelected} />
      <UserInfo user={user} />
      <div className=" absolute right-0 bottom-0 w-cart">
        <Cart />
        <Cart />
        <Cart />
      </div>
    </div>
  );
};

export default Home;
