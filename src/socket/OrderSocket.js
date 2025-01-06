import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const socketUrl = "https://efood-brvf.onrender.com/ws";

const connectWebSocket = (setNotification, userId) => {
  if (!userId) {
    console.error("User ID is required to connect to the WebSocket");
    return;
  }

  const client = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("Connected to WebSocket");

      // Subscribe to the topic specific to the user
      const userTopic = `/topic/orders/user/${userId}`;
      client.subscribe(userTopic, (message) => {
        const notification = JSON.parse(message.body);
        console.log("Notification received:", notification);

        // Update state with the notification details
        setNotification({
          message: notification.message, // "Order status updated"
          orderId: notification.orderId, // The order ID
          status: notification.status, // The new status
        });
      });
    },
    onStompError: (error) => {
      console.error("WebSocket error:", error);
    },
  });

  client.activate(); // Start the WebSocket connection
};

export default connectWebSocket;
