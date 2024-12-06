import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LogIn";
import { Route, Routes, BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
