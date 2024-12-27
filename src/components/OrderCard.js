const Cancel = () => {
  return (
    <div className="absolute right-4 top-4 bg-gradient-to-r from-[#FF9843] to-[#FF5353] px-2 rounded-lg text-white text-h5">
      cancel
    </div>
  );
};

const List = ({ name, quantity }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2">{name || "Special Pizza"}</span>
      <span className="flex-grow border-t-2 border-black border-dashed mx-2"></span>
      <span>{quantity || "2"}</span>
    </div>
  );
};

const OrderedItems = ({ items }) => {
  return (
    <div className="text-h3 w-[80%]">
      {items.map((item, index) => {
        return (
          <List
            key={index}
            name={item.food.name} // Access the name from the food object
            quantity={item.quantity} // Corrected property name
          />
        );
      })}
    </div>
  );
};

const OrderStatusDiv = () => {
  return (
    <div className="bg-gradient-to-r from-[#FF9843] to-[#FF5353] px-1.5 rounded-xl text-white text-hm inline-block my-2">
      Order Status
    </div>
  );
};

const OrderStatus = ({ id, status, role }) => {
  const state = ["Pending", "Accepted", "Preparing", "Ready", "Delivered"];

  const statusUpdate = async (currentStatus, direction) => {
    let newStatus = currentStatus;
    for (let i = 0; i < state.length - 1; i++) {
      if (currentStatus === state[i]) {
        if (direction === false && i != 0) newStatus = state[i - 1];
        else if (direction === true) newStatus = state[i + 1];
        break; // Exit the loop once we find the next status
      }
    }
    console.log("New Status:", newStatus); // Log the updated status
    await changeStatus({ id, status: newStatus }); // Call your status update function with the new status
  };

  console.log("Current Status:", status);

  return (
    <div>
      <div className="flex">
        {/* {role === "ROLE_ADMIN" ? (
          <div
            className="bg-red-400 rounded-full p-1 "
            onClick={() => statusUpdate(status, false)} // Pass current status to statusUpdate
          >{`<<`}</div>
        ) : (
          ""
        )} */}
        <div className="h-2 w-[85%] mx-[5%] overflow-hidden rounded-full border border-[#286e1a] bg-[#ffe91f60]">
          <div
            className={`h-full ${status === "Pending" ? "bg-sent" : ""} ${
              status === "Accepted" ? "bg-accepted" : ""
            } ${status === "Preparing" ? "bg-preparing" : ""} ${
              status === "Ready" ? "bg-ready" : ""
            } ${status === "Delivered" ? "bg-delivered" : ""}`}
          ></div>
        </div>
        {/* {role === "ROLE_ADMIN" ? (
          <div
            className="bg-green-400 rounded-full p-1"
            onClick={() => statusUpdate(status, true)} // Pass current status to statusUpdate
          >{`>>`}</div>
        ) : null} */}
      </div>

      <div className="flex justify-evenly w-[96%] text-h5">
        <p>Sent</p>
        <p>Accepted</p>
        <p>Preparing</p>
        <p>Ready</p>
        <p>Delivered</p>
      </div>
    </div>
  );
};

// Assuming `changeStatus` function is defined somewhere in your app as shown earlier
const changeStatus = async ({ id, status }) => {
  try {
    const response = await fetch(
      `https://efood-brvf.onrender.com/api/orders/status/${id}?status=${status}`,
      {
        method: "PUT",
        headers: {
          Accept: "*/*", // Add any other necessary headers
        },
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

const OrderCard = ({ price, id, items, status, role }) => {
  console.log(role);
  return (
    <div className="bg-[#FFFDB5] border-[1px] border-black w-[36%] relative p-3 px-8">
      <Cancel />
      <OrderedItems items={items || []} />
      <OrderStatusDiv />

      <OrderStatus status={status} id={id} role={role} />
    </div>
  );
};
export default OrderCard;
