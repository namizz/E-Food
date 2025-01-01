// import React, { useState, useEffect } from "react";
// import connectWebSocket from "../../socket/Socket";
// import NotificationCard from "../NotificationCard";

// const OrderNotification = ({ user, OrdNotify, setOrdNotify }) => {
//   const userID = user ? user.id : "";
//   useEffect(() => {
//     const socket = connectWebSocket();
//     socket.on("orderStatusUpdate", (data) => {
//       if (data.userID === userID) {
//         setOrdNotify((prev) => [
//           ...prev,
//           `Your order is now ${data.newStatus}`,
//         ]);
//       }
//     });

//     return () => socket.disconnect();
//   }, [userID]);

//   const handleNotificationDismiss = (index) => {
//     setOrdNotify((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="absolute flex flex-col-reverse right-10">
//       {OrdNotify.map((msg, index) => (
//         <NotificationCard
//           key={index}
//           message={msg}
//           onClick={() => handleNotificationDismiss(index)}
//         />
//       ))}
//     </div>
//   );
// };

// export default OrderNotification;
