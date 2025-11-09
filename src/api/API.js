const BACKEND_URL = process.env.REACT_APP_BASE_URL;

export const signup = async (Info) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(Info),
    });
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
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
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
    const response = await fetch(`${BACKEND_URL}/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });

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
    const response = await fetch(`${BACKEND_URL}/api/foods`, {
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
    const response = await fetch(`${BACKEND_URL}/api/foods`, {
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
  try {
    const payload = { orderItems: arr };
    const response = await fetch(`${BACKEND_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (!response.ok) {
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
    const response = await fetch(`${BACKEND_URL}/api/orders/new`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
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
    const response = await fetch(`${BACKEND_URL}/api/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
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
      `${BACKEND_URL}/api/orders/status/${id}?status=${status}`,
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
    const response = await fetch(`${BACKEND_URL}/api/foods/${id}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Failed to get: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error Getting Item:", error);
  }
};

export const updateItem = async (id, info) => {
  console.log(id, info);
  try {
    const response = await fetch(`${BACKEND_URL}/api/foods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to update: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error Updating Item:", error);
  }
};

export const deleteItem = async (id) => {
  console.log(`Deleting item with ID: ${id}`);
  try {
    const response = await fetch(`${BACKEND_URL}/api/foods/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error Deleting Item:", error);
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      credentials: "include",
    });
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
    const response = await fetch(`${BACKEND_URL}/api/orders/new`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
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
    const response = await fetch(`${BACKEND_URL}/api/orders/daily`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
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
    const response = await fetch(`${BACKEND_URL}/api/orders/weekly`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
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
    const response = await fetch(`${BACKEND_URL}/api/orders/monthly`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
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
    const response = await fetch(`${BACKEND_URL}/api/foods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAvailable: !value }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to update availability: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error Updating Availability:", error);
  }
};
