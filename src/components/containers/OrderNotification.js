import React, { useEffect, useState } from "react";
import connectWebSocket from "../../socket/OrderSocket";
import NotificationCard from "../NotificationCard";

const OrderNotification = ({ OrdNotify, setOrdNotify, user }) => {
  useEffect(() => {
    if (!user || !user.id) {
      console.error("User ID not found. Cannot connect to WebSocket.");
      return;
    }
    // Connect to WebSocket using the user ID
    connectWebSocket((newNotification) => {
      console.log("New notification received:", newNotification);
      const updatedNotifications = [newNotification, ...OrdNotify];
      setOrdNotify(updatedNotifications);
      localStorage.setItem(
        "Onotifications",
        JSON.stringify(updatedNotifications)
      );
    }, user.id);

    // Load notifications from local storage on mount
    const storedNotifications =
      JSON.parse(localStorage.getItem("Onotifications")) || [];
    setOrdNotify(storedNotifications);
  }, [user]);

  const handleResponse = (response, index) => {
    console.log("User response:", response);

    // Clear the notification after responding
    const updatedNotifications = OrdNotify.filter((_, i) => i !== index);
    setOrdNotify(updatedNotifications);
    localStorage.setItem(
      "Onotifications",
      JSON.stringify(updatedNotifications)
    );
  };

  const handleNotificationClick = (index) => {
    console.log("Notification seen:", OrdNotify[index]);
    handleResponse(null, index); // Remove it after clicking
  };

  return (
    <div className="absolute flex flex-col-reverse right-10">
      {OrdNotify.map((notification, index) => (
        <NotificationCard
          key={index}
          status={notification.status || "Pending"}
          message={notification.message || notification}
          onRespond={(response) => handleResponse(response, index)}
          onClick={() => handleNotificationClick(index)}
        />
      ))}
    </div>
  );
};

export default OrderNotification;
