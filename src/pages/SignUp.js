import Input from "../components/LogInInputs";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SinUpForm = () => {
  const navigate = useNavigate();
  const [Info, setInfo] = useState({
    name: "",
    phone: "",
    password: "",
  });

  // Navigate to createUser route if user is new
  const LogIn = () => {
    return navigate("/login");
  };
  const handleChange = (e) => {};
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     if (name === "phone") {
  //       setPhone(value);
  //     } else if (name === "password") {
  //       setPassword(value);
  //     }
  //   };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col items-center bg-gray-800 bg-opacity-30 backdrop-blur-sm p-8 rounded-lg w-full max-w-sm"
        //onSubmit={handleSubmit}
      >
        <p className="text-[#2f678d] text-4xl mb-12 font-bold font-jolly-lodger">
          E-Food SignUp
        </p>
        <Input
          msg="Name (e.g Naomi Zerfu)"
          name="name"
          value={Info.name}
          onChange={handleChange}
        />
        <Input
          msg="Phone Number (e.g 0991065050)"
          name="phone"
          value={Info.phone}
          onChange={handleChange}
        />
        <Input
          msg="Create password"
          type="password"
          name="password"
          value={Info.password}
          onChange={handleChange}
        />
        <Input
          msg="Confirm password"
          type="password"
          name="password"
          value={Info.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-gradient-to-br from-[#ffef93] to-[#fcb045] text-blue-800 py-3 w-80 rounded-lg mt-8 text-lg font-medium  hover:from-[#fff176] hover:to-[#ffd54f] transition-all duration-600 "
        >
          Sign Up
        </button>

        <div
          className="text-[#f3e17ade] bg-slate-600 p-1 px-4 rounded-xl bg-opacity-35 mt-6 hover:text-green-200 hover:bg-opacity-80 hover:bg-slate-800 transition-all duration-100"
          onClick={LogIn}
        >
          Log In
        </div>
      </form>
    </div>
  );
};

const SinUpPage = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center backdrop-blur-2xl"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/05/66/28/54/360_F_566285463_VqhNEzBvrNPqUXfskGRdONrNYMaNdXkp.jpg')`,
      }}
    >
      <SinUpForm />
    </div>
  );
};

export default SinUpPage;
