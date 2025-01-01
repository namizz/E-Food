const NewOrders = () => {
  return (
    <div className="bg-blue-500">
      <p>New Order</p>
      <div>18</div>
    </div>
  );
};
const DailyOrder = () => {
  return (
    <div className="bg-red-500">
      <p>Dalily Order</p>
      <div>105</div>
    </div>
  );
};
const WeeklyOrder = () => {
  return (
    <div className="bg-blue-500">
      <p>Weekly Order</p>
      <div>1000</div>
    </div>
  );
};
const MonthlyOrder = () => {
  return (
    <div className="bg-blue-500">
      <p>Monthly Order</p>
      <div>4000</div>
    </div>
  );
};
const Report = () => {
  return (
    <div className="border-2 border-green-700 bg-red-500 inline-block px-10">
      <p className="bg-red-500">Report</p>
      <div className="flex">
        <NewOrders />
        <DailyOrder />
        <div>
          <WeeklyOrder />
          <MonthlyOrder />
        </div>
      </div>
    </div>
  );
};
export default Report;
