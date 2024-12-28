import { useEffect, useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import OrderCard from "../components/OrderCard";
import { orderedItems, PersonInfo, myorder } from "../api/API";
import { useUser } from "../content/UserContent";

const Order = () => {
  const [ordered, setOrders] = useState([]);
  const { user, setUser } = useUser();
  useEffect(() => {
    // Fetch user info
    const fetchData = async () => {
      try {
        const data = await PersonInfo();
        setUser(data.data); // Set the user information
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch orders based on user role after user info is fetched
    const fetchOrders = async () => {
      if (user) {
        if (user.role === "ROLE_ADMIN") {
          try {
            const fetchedOrders = await orderedItems();
            setOrders(fetchedOrders); // Store orders in state
            console.log("Orders: ", fetchedOrders);
          } catch (error) {
            console.error("Failed to fetch orders:", error.message);
          }
        } else if (user.role === "ROLE_USER") {
          try {
            const fetchedOrders = await myorder();
            setOrders(fetchedOrders);
            console.log("Orders:", fetchedOrders);
          } catch (error) {
            console.error("Failed to fetch orders:", error.message);
          }
        } else {
          console.log("User is not identified");
        }
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]); // Run this effect whenever 'user' state changes
  return (
    <div className="flex flex-col items-center mx-auto border-2">
      <Header />
      {/* <NavBar /> */}
      <div className="border-2">
        <p>Current Orders</p>
      </div>

      {ordered.length > 0
        ? ordered.map((o) => {
            const compositeKey = `${o.id}-${o.status}-${o.totalPrice}`; // Create a composite key
            return (
              <OrderCard
                key={compositeKey}
                id={o.id}
                items={o.items}
                status={o.status}
                price={o.totalPrice}
                role={user.role}
              />
            );
          })
        : "There is No Order "}

      <div>
        <p>Past Orders</p>
      </div>
    </div>
  );
};

export default Order;
