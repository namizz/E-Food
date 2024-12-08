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
      <NavBar changeDisplay={changeDisplay} />
      <NewItem display={addDisplay} />
      <Items />
    </div>
  );
};

export default Home;
