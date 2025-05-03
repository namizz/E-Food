import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LogIn";
import SinUpPage from "./pages/SignUp";
import Order from "./pages/Order";
import PastOrders from "./pages/PastOrder";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./content/UserContent";
import { useState } from "react";
import Intro from "./pages/Intro";

const App = () => {
  const [addDisplay, setDisplay] = useState("none"); // About new food
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={<Intro addDisplay={addDisplay} setDisplay={setDisplay} />}
          />
          <Route
            path="/home"
            element={<Home addDisplay={addDisplay} setDisplay={setDisplay} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SinUpPage />} />
          <Route
            path="/order"
            element={<Order addDisplay={addDisplay} setDisplay={setDisplay} />}
          />
          <Route path="/past-orders" element={<PastOrders />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
