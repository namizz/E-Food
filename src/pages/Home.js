import ItemCard from "../components/ItemCard";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import NewItem from "../components/containers/NewItem";
import React from "react";

const Items = () => {
  return (
    <div className="w-[75%] mx-auto">
      <p className="border-[4px] border-[#FF8E32] text-h2 text-[#FF7300] font-semibold inline-block px-item rounded-t-3xl">
        Items
      </p>
      <hr className="relative bottom-1 h-[4px] bg-[#FF8E32]" />
      <div className="border-t-2 border-b-2 border-[#FF8E32] py-4 rounded-xl flex">
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
};
const BackgroundImg2 = () => {
  return (
    <div className="absolute z-[-10] opacity-10 w-full ">
      <img
        className="h-[100vh] w-full object-fill"
        src="https://i.pinimg.com/736x/f5/d9/f8/f5d9f8c8c418b21f002c51bbff5823fa.jpg"
      />
    </div>
  );
};

const BackgroundImg = () => {
  return (
    <div className="absolute z-[-10] opacity-75 w-full ">
      <img
        className="h-[100vh] w-full object-cover"
        src="https://i.pinimg.com/736x/d2/a7/b8/d2a7b8e3626b849ed5b81e58625cae4d.jpg"
      />
    </div>
  );
};

const Home = () => {
  const [addDisplay, setDisplay] = React.useState("none");
  const changeDisplay = () => {
    console.log("clicked new item");
    if (addDisplay === "none") setDisplay("block");
    else setDisplay("none");
  };
  return (
    <div>
      <Header />
      <BackgroundImg />
      <BackgroundImg2 />
      <NavBar changeDisplay={changeDisplay} />
      <NewItem display={addDisplay} />
      <Items />
    </div>
  );
};

export default Home;
