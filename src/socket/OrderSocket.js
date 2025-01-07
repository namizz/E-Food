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

      const userTopic = `/topic/orders/user/${userId}`;
      client.subscribe(userTopic, (message) => {
        const notification = JSON.parse(message.body);
        console.log("Notification received:", message.body);

        setNotification({
          message: notification.message,
          orderId: notification.orderId,
          status: notification.status,
        });
      });
    },
    onStompError: (error) => {
      console.error("WebSocket error:", error);
    },
  });

  client.activate();
};

export default connectWebSocket;
