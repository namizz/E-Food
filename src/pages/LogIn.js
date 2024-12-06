import Input from "../components/LogInInputs";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(""); // To store error message if login fails

  // Navigate to createUser route if user is new
  const BeMember = () => {
    return navigate("/createUser");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setPhone(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col items-center bg-gray-800 bg-opacity-30 backdrop-blur-sm p-8 rounded-lg w-full max-w-sm"
        //onSubmit={handleSubmit}
      >
        <p className="text-[#2f678d] text-4xl mb-12 font-bold font-jolly-lodger">
          E-Food LogIn
        </p>
        <Input
          msg="Phone Number (e.g 0991065050)"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
        <Input
          msg="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="bg-gradient-to-br from-[#ffef93] to-[#fcb045] text-blue-800 py-3 w-80 rounded-lg mt-8 text-lg font-medium  hover:from-[#fff176] hover:to-[#ffd54f] transition-all duration-600 "
        >
          Login
        </button>

        <div
          className="text-[#f3e17ade] bg-slate-600 p-1 px-4 rounded-xl bg-opacity-35 mt-6 hover:text-green-200 hover:bg-opacity-80 hover:bg-slate-800 transition-all duration-100"
          onClick={BeMember}
        >
          Be Member
        </div>
      </form>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center backdrop-blur-2xl"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/05/66/28/54/360_F_566285463_VqhNEzBvrNPqUXfskGRdONrNYMaNdXkp.jpg')`,
      }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
