import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const socketUrl = "https://efood-brvf.onrender.com/ws"; // Backend URL
const topic = "/topic/admin";

const connectWebSocket = (setNotification) => {
  const client = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("Connected to WebSocket");
      client.subscribe(topic, (message) => {
        console.log("Notification received:", message.body);
        setNotification(message.body); // Update state with the message body
      });
    },
    onStompError: (error) => {
      console.error("WebSocket error:", error);
    },
  });

  client.activate(); // Start the WebSocket connection
};

export default connectWebSocket;
