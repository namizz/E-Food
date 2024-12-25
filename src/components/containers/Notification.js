// src/components/Notifications.js
import React, { useState, useEffect } from "react";
import connectWebSocket from "../../socket/Socket";
import NotificationCard from "../NotificationCard"; // Assuming you have a card component for notifications

const Notifications = () => {
  const [notification, setNotification] = useState(null); // State to store the notification

  useEffect(() => {
    connectWebSocket(setNotification); // Pass setNotification to connectWebSocket
  }, []); // Run only once when the component mounts

  return (
    <div className="bg-red-400 fixed right-10 top-1">
      <h1>Notifications</h1>
      <p>Listening for real-time updates...</p>

      {/* Display notification if available */}
      {notification && (
        <NotificationCard
          message={notification}
          onRespond={(response) => {
            console.log("User response:", response);
            setNotification(null); // Clear the notification after responding
          }}
        />
      )}
    </div>
  );
};

export default Notifications;
