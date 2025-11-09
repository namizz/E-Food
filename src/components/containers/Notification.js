import React, { useEffect } from "react";
import connectWebSocket from "../../socket/Socket";
import NotificationCard from "../NotificationCard";

const Notifications = ({ notifications, setNotifications }) => {
  useEffect(() => {
    // Load notifications from local storage on mount
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);

    // Connect to WebSocket and handle incoming notifications
    connectWebSocket((newNotification) => {
      const updatedNotifications = [newNotification, ...notifications];
      console.log("Updated notifications:", updatedNotifications);
      setNotifications(updatedNotifications);
      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
    });
  }, [notifications, setNotifications]); // Run only once when the component mounts

  const handleResponse = (response, index) => {
    console.log("User response:", response);

    // Clear the notification after responding
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const handleNotificationClick = (index) => {
    // Mark notification as seen (you can customize this further)
    console.log("Notification seen:", notifications[index]);

    // Optionally remove or modify the notification
    handleResponse(null, index); // Remove it after clicking
  };

  return (
    <div className="absolute flex flex-col-reverse right-10">
      {notifications.map((notification, index) => (
        <NotificationCard
          key={index}
          message={notification}
          onRespond={(response) => handleResponse(response, index)}
          onClick={() => handleNotificationClick(index)} // Pass click handler
        />
      ))}
    </div>
  );
};

export default Notifications;
