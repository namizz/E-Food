import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LogIn";
import SinUpPage from "./pages/SignUp";
import Order from "./pages/Order";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./content/UserContent";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SinUpPage />} />
        <Route path="/order" element={<div>hello world</div>} />
      </Routes>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
