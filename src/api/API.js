export const signup = async (Info) => {
  try {
    const response = await fetch(
      "https://efood-backend-zv00.onrender.com/auth/signup",
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
    const response = await fetch(
      "https://efood-backend-zv00.onrender.com/auth/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(Info),
        credentials: "include",
      }
    );
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
      "https://efood-backend-zv00.onrender.com/api/users/me",
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
    return data;
  } catch (error) {
    console.error("Get User Info failed", error.message);
    throw error;
  }
};

export const AddFood = async (formData) => {
  try {
    const response = await fetch(
      "https://efood-backend-zv00.onrender.com/api/foods",
      {
        method: "POST",
        body: formData, // Send formData directly
        credentials: "include",
      }
    );

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
    const response = await fetch(
      "https://efood-backend-zv00.onrender.com/api/foods",
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
      throw new Error(errorData.message || "Failed to get all food");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const orderFood = async (arr) => {
  const url = "https://efood-backend-zv00.onrender.com/api/orders";

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

export const orderedItems = async () => {
  try {
    const response = await fetch(
      "https://efood-backend-zv00.onrender.com/api/orders/new",
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
      throw new Error(errorData.message || "Can't fetch orderd Item");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching the order:", error.message);
    throw error;
  }
};
export const myorder = async () => {
  try {
    const response = await fetch(
      "https://efood-backend-zv00.onrender.com/api/orders",
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
      throw new Error(errorData.message || "Can't fetch orderd Item");
    }
    const data = await response.json();
    console.log("Fetch the ordered Item", data.data);
    return data.data;
  } catch (error) {
    console.error("Error fetching the order:", error.message);
    throw error;
  }
};
export const changeStatus = async ({ id, status }) => {
  try {
    const response = await fetch(
      `https://efood-backend-zv00.onrender.com/api/orders/status/${id}?status=${status}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update order status: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Order status updated:", data);
    return data;
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

export const getItemById = async (id) => {
  try {
    const response = await fetch(
      `https://efood-backend-zv00.onrender.com/api/foods/${id}`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to get: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error Getting Item:", error);
  }
};
// export const updateItem = async (id, Info) => {
//   console.log(id, Info);
//   try {
//     const response = await fetch(
//       `https://efood-backend-zv00.onrender.com/api/foods/${id}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           method: "PUT",
//           body: JSON.stringify({ Info }),
//           credentials: "includes",
//         },
//       }
//     );
//     if (!response.ok) {
//       throw new Error(`Failed to update: ${response.statusText}`);
//     }
//     const data = await response.json();
//     return data.message;
//   } catch (error) {
//     console.error("Error Updating Item:", error);
//   }
// };
export const updateItem = async (id, info) => {
  console.log(id, info);
  try {
    const response = await fetch(
      `https://efood-backend-zv00.onrender.com/api/foods/${id}`,
      {
        method: "PUT", // Correct placement of method
        headers: {
          "Content-Type": "application/json", // Correct header key
        },
        body: JSON.stringify(info), // Correctly stringify `info` directly
        credentials: "include", // Correct credentials value
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message; // Assuming the response contains a `message` field
  } catch (error) {
    console.error("Error Updating Item:", error);
  }
};
export const deleteItem = async (id) => {
  console.log(`Deleting item with ID: ${id}`);
  try {
    const response = await fetch(
      `https://efood-backend-zv00.onrender.com/api/foods/${id}`,
      {
        method: "DELETE", // Use DELETE method
        credentials: "include", // Include credentials (cookies, authorization headers, etc.)
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.statusText}`);
    }

    const data = await response.json(); // Assuming the response contains a message
    return data.message; // Return a success message or any relevant response
  } catch (error) {
    console.error("Error Deleting Item:", error);
  }
};

export const logout = async () => {
  try {
    const response = await fetch(
      "https://efood-backend-zv00.onrender.com/api/users/logout",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to Logout");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Logout:", error);
  }
};

export const newOrder = async () => {
  try {
    const response = await fetch(
      "https://efood-backend-zv00.onrender.com/api/orders/new",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch numebr of order");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching numebr of order:", error);
  }
};
export const dailyOrder = async () => {
  try {
    const response = await fetch(
      "https://efood-backend-zv00.onrender.com/api/orders/daily",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch numebr of order");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching numebr of order:", error);
  }
};
export const weeklyOrder = async () => {
  try {
    const response = await fetch(
      "https://efood-backend-zv00.onrender.com/api/orders/weekly",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch numebr of order");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching numebr of order:", error);
  }
};
export const monthlyOrder = async () => {
  try {
    const response = await fetch(
      "https://efood-backend-zv00.onrender.com/api/orders/monthly",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch numebr of order");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching numebr of order:", error);
  }
};

export const updateAvailability = async (id, value) => {
  console.log(`Updating availability for ID: ${id}, Current Value: ${value}`);
  try {
    const response = await fetch(
      `https://efood-backend-zv00.onrender.com/api/foods/${id}`,
      {
        method: "PUT", // Use PUT method
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({ isAvailable: !value }), // Negate the input value
        credentials: "include", // Include credentials (cookies, authorization headers, etc.)
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update availability: ${response.statusText}`);
    }

    const data = await response.json(); // Parse the JSON response
    return data.message; // Assuming the response contains a `message` field
  } catch (error) {
    console.error("Error Updating Availability:", error);
  }
};
