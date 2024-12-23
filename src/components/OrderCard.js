const Cancel = () => {
  return (
    <div className="absolute right-4 top-4 bg-gradient-to-r from-[#FF9843] to-[#FF5353] px-2 rounded-lg text-white text-h5">
      cancel
    </div>
  );
};
const OrederedItems = () => {
  return (
    <div className="text-h3">
      Special Pizza -------------------------------------- 2
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
const OrderStatus = () => {
  return (
    <div>
      <div className="h-2 w-[85%] mx-[5%] overflow-hidden rounded-full border border-[#286e1a] bg-[#ffe91f60]">
        <div className="h-full bg-sent"></div>
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
const OrderCard = () => {
  return (
    <div className="bg-[#FFFDB5] border-[1px] border-black w-[36%] relative p-3 px-8">
      <Cancel />
      <OrederedItems />
      <OrederedItems />
      <OrderStatusDiv />

      <OrderStatus />
    </div>
  );
};
export default OrderCard;
