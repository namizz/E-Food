import Input from "../components/LogInInputs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/API";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [Info, setInfo] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [load, setLoad] = useState(false); // Loading state for the Sign-Up button
  const [error, setError] = useState("");

  const LogIn = () => {
    return navigate("/");
  };

  const SignUpButton = () => {
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
        {!load ? "Sign Up" : "Signing up..."}
      </button>
    );
  };

  const LogInButton = () => {
    return (
      <div
        className="text-[#f3e17ade] bg-slate-600 p-1 px-4 rounded-xl bg-opacity-35 mt-6 hover:text-green-200 hover:bg-opacity-80 hover:bg-slate-800 transition-all duration-100"
        onClick={!load ? LogIn : null} // Disable navigation when loading
      >
        Log In
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoad(true); // Set loading state

    // Basic validation
    if (Info.password !== Info.confirmPassword) {
      setError("Passwords do not match");
      setLoad(false); // Reset loading state
      return;
    }

    if (
      !Info.name ||
      !Info.phoneNumber ||
      !Info.password ||
      !Info.confirmPassword
    ) {
      setError("All fields are required");
      setLoad(false); // Reset loading state
      return;
    }

    try {
      const { confirmPassword, ...Information } = Info; // Exclude confirmPassword from the data sent to the API
      const result = await signup(Information);
      console.log(result); // Log the result for debugging
      navigate("/"); // Navigate to the login page on success
    } catch (err) {
      setError(err.message || "Failed to sign up");
    }

    setLoad(false); // Reset loading state
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col items-center bg-gray-800 bg-opacity-30 backdrop-blur-sm p-8 rounded-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <p className="text-[#4099d4] text-4xl mb-12 font-bold font-jolly-lodger">
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
          name="phoneNumber"
          value={Info.phoneNumber}
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
          name="confirmPassword"
          value={Info.confirmPassword}
          onChange={handleChange}
        />

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <SignUpButton />

        <LogInButton />
      </form>
    </div>
  );
};

const SignUpPage = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center backdrop-blur-2xl"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/f7/c8/76/f7c8768df03d080ffd26828bd36b70df.jpg')`,
      }}
    >
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
