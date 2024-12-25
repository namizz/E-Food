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
    const response = await fetch("https://efood-brvf.onrender.com/api/foods", {
      method: "POST",
      body: formData, // Send formData directly
      credentials: "include",
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

export const getFood = async () => {
  try {
    const response = await fetch("https://efood-brvf.onrender.com/api/foods", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get all food");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const orderFood = async (arr) => {
  const url = "https://efood-brvf.onrender.com/api/orders";

  try {
    // Wrapping `arr` into the required structure
    const payload = {
      orderItems: arr, // Assuming `arr` is the list of order items
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Convert object to JSON string
      credentials: "include",
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();
    console.log("Order placed successfully:", data);
    return data;
  } catch (error) {
    console.error("Error placing the order:", error.message);
    throw error;
  }
};

// export const orderFood = async (arr) => {
//   const wsUrl = "wss://efood-brvf.onrender.com/api/orders"; // WebSocket URL

//   // Check WebSocket compatibility
//   if (!window.WebSocket) {
//     throw new Error("WebSocket is not supported in this browser.");
//   }

//   return new Promise((resolve, reject) => {
//     const socket = new WebSocket(wsUrl);

//     // Open WebSocket connection
//     socket.onopen = () => {
//       console.log("WebSocket connection established.");
//       try {
//         // Send the data as a JSON string
//         const dataToSend = JSON.stringify(arr);
//         socket.send(dataToSend);
//         console.log("Data sent:", dataToSend);
//       } catch (error) {
//         reject(`Error sending data: ${error.message}`);
//       }
//     };

//     // Handle messages from the server
//     socket.onmessage = (event) => {
//       console.log("Message received from server:", event.data);
//       try {
//         const response = JSON.parse(event.data);
//         resolve(response);
//       } catch (error) {
//         reject(`Error parsing server response: ${error.message}`);
//       } finally {
//         socket.close(); // Close connection after receiving a response
//       }
//     };

//     // Handle WebSocket errors
//     socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//       reject(`WebSocket error: ${error.message}`);
//     };

//     // Handle WebSocket closure
//     socket.onclose = (event) => {
//       if (event.wasClean) {
//         console.log(
//           `WebSocket closed cleanly with code ${event.code} and reason: ${event.reason}`
//         );
//       } else {
//         console.error("WebSocket closed unexpectedly.");
//       }
//     };
//   });
// };
