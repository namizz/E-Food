import Input from "../components/LogInInputs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/API";
import { PersonInfo } from "../api/API";

const LoginForm = () => {
  const navigate = useNavigate();
  const [Info, setInfo] = useState({
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState(""); // To store error message if login fails

  // Navigate to createUser route if user is new
  const SignUp = () => {
    return navigate("/signup");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phoneNumber, password } = Info;

    if (!phoneNumber || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const result = await login(Info);

      console.log(result); // Log the result of the login attempt

      // Redirect to home page
      navigate("/");
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col items-center bg-gray-800 bg-opacity-30 backdrop-blur-sm p-8 rounded-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <p className="text-[#2f678d] text-4xl mb-12 font-bold font-jolly-lodger">
          E-Food LogIn
        </p>
        <Input
          msg="Phone Number (e.g 0991065050)"
          name="phoneNumber"
          value={Info.phoneNumber}
          onChange={handleChange}
        />
        <Input
          msg="Password"
          type="password"
          name="password"
          value={Info.password}
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
          onClick={SignUp}
        >
          Sign Up
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
        backgroundImage: `url('https://i.pinimg.com/736x/e1/5e/03/e15e033731d2da74297cc50cb126f33e.jpg')`,
      }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
