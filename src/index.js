import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LogIn";
import SinUpPage from "./pages/SignUp";
import Order from "./pages/Order";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./content/UserContent";
import { useState } from "react";

const App = () => {
  const [addDisplay, setDisplay] = useState("none"); // About new food
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={<Home addDisplay={addDisplay} setDisplay={setDisplay} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SinUpPage />} />
          <Route
            path="/order"
            element={<Order addDisplay={addDisplay} setDisplay={setDisplay} />}
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
