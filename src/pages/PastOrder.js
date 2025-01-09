import { useEffect, useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import OrderCard from "../components/OrderCard";
import { orderedItems, PersonInfo, myorder } from "../api/API";
import { useUser } from "../content/UserContent";
import { BackgroundImg, BackgroundImg2 } from "../components/Background";

const PastOrders = () => {
  const [ordered, setOrders] = useState([]);
  const { user, setUser } = useUser();

  useEffect(() => {
    // Fetch user info
    const fetchUserInfo = async () => {
      try {
        const data = await PersonInfo();
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [setUser]);

  useEffect(() => {
    // Fetch orders based on user role
    const fetchUserOrders = async () => {
      if (user) {
        try {
          const fetchedOrders =
            user.role === "ROLE_ADMIN" ? await orderedItems() : await myorder();
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Failed to fetch orders:", error.message);
        }
      }
    };

    fetchUserOrders();
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <Header user={user} />
      <BackgroundImg />
      <BackgroundImg2 />
      <div className="items-end w-full">
        <NavBar user={user} />
      </div>

      <div className="text-center">
        <h2 className="text-lg font-light">History</h2>
      </div>

      {user && user.role === "ROLE_USER" ? (
        ordered.length > 0 ? (
          <div className="flex flex-col-reverse w-full items-center">
            {ordered.map((order) => {
              if (order.status === "Delivered") {
                const compositeKey = `${order.id}-${order.status}-${order.totalPrice}`;
                return (
                  <OrderCard
                    key={compositeKey}
                    id={order.id}
                    items={order.items}
                    status={order.status}
                    price={order.totalPrice}
                    role={user.role}
                    ps={true}
                  />
                );
              }
              return null;
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">There is No Past Order</p>
        )
      ) : (
        <p className="text-center text-red-500">Access Denied</p>
      )}
    </div>
  );
};

export default PastOrders;
