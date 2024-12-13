export const signup = async (Info) => {
  try {
    const response = await fetch(
      "https://efood-brvf.onrender.com/auth/signup",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(Info),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to sign up");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Sign up failed", error.message);
    throw error;
  }
};
export const login = async (Info) => {
  console.log(JSON.stringify(Info));
  try {
    const response = await fetch("https://efood-brvf.onrender.com/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(Info),
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log in");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Log in failed", error.message);
    throw error;
  }
};
export const PersonInfo = async () => {
  try {
    const response = await fetch(
      "https://efood-brvf.onrender.com/api/users/me",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      }
    );

    console.log("Response status:", response.status);
    console.log("Response body:", await response.text()); // Log raw response to check if it's a JSON response

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get user information");
    }

    const data = await response.json();
    console.log("Fetched user data:", data);
    return data;
  } catch (error) {
    console.error("Get User Info failed", error.message);
    throw error;
  }
};

export const AddFood = async (formData) => {
  try {
    const response = await fetch("https://efood-brvf.onrender.com/api/", {
      method: "POST",
      body: formData, // Send formData directly
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add item");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to add Info", error);
    throw error;
  }
};
