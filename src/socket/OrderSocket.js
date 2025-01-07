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
      console.log("Order to WebSocket");

      // Subscribe to the user-specific topic
      const userTopic = `/topic/orders/user/${userId}`;
      client.subscribe(userTopic, (message) => {
        console.log("Notification received:", message.body);
        const notification = JSON.parse(message.body);

        setNotification(notification);
      });
    },
    onStompError: (error) => {
      console.error("WebSocket error:", error);
    },
  });

  client.activate();
};

export default connectWebSocket;
