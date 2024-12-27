import Input from "../components/LogInInputs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/API";

const LoginForm = () => {
  const navigate = useNavigate();
  const [Info, setInfo] = useState({
    phoneNumber: "",
    password: "",
  });
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(""); // To store error message if login fails

  // Navigate to createUser route if user is new
  const SignUp = () => {
    return navigate("/signup");
  };

  const LogInButton = () => {
    return (
      <button
        type="submit"
        disabled={load} // Disable the button when loading
        className={`${
          !load
            ? "bg-gradient-to-br from-[#ffef93] to-[#fcb045]"
            : "bg-gradient-to-br from-[#ffae52] to-[#ff9822]"
        }  text-blue-800 py-3 w-80 rounded-lg mt-8 text-lg font-medium ${
          !load ? "hover:from-[#fff176] hover:to-[#ffd54f]" : ""
        } transition-all duration-600 `}
      >
        {!load ? "Login" : "Logging in..."}
      </button>
    );
  };
  const SignUpButton = () => {
    return (
      <div
        className="text-[#f3e17ade] bg-slate-600 p-1 px-4 rounded-xl bg-opacity-35 mt-6 hover:text-green-200 hover:bg-opacity-80 hover:bg-slate-800 transition-all duration-100"
        onClick={!load ? SignUp : null}
      >
        Sign Up
      </div>
    );
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
    setLoad(true);
    const { phoneNumber, password } = Info;

    if (!phoneNumber || !password) {
      setError("All fields are required");
      setLoad(false);
      return;
    }

    try {
      await login(Info);
      navigate("/");
    } catch (error) {
      setError("Login failed. Please try again.");
    }
    setLoad(false);
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

        <LogInButton />

        <SignUpButton />
      </form>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center backdrop-blur-2xl"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/f7/c8/76/f7c8768df03d080ffd26828bd36b70df.jpg')`,
      }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
