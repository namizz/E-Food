import { useEffect, useState } from "react";
import { dailyOrder, newOrder, weeklyOrder, monthlyOrder } from "../api/API";

const NewOrders = () => {
  const [numNewOrder, setNewOrder] = useState(0);

  useEffect(() => {
    const fetchNewOrders = async () => {
      try {
        const orders = await newOrder();
        setNewOrder(orders.length); // Assuming newOrder returns an array
      } catch (error) {
        console.log("Can't fetch newOrder", error);
      }
    };

    fetchNewOrders();
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="text-red-500 text-h4 px-4 font-semibold">
      <p>New Order</p>
      <div className="text-h1 text-center font-bold">{numNewOrder}</div>
    </div>
  );
};

const DailyOrder = () => {
  const [numDayOrder, setDayOrder] = useState(0);

  useEffect(() => {
    const fetchDailyOrders = async () => {
      try {
        const orders = await dailyOrder();
        setDayOrder(orders.length); // Assuming dailyOrder returns an array
      } catch (error) {
        console.log("Can't fetch daily orders", error);
      }
    };

    fetchDailyOrders();
  }, []);

  return (
    <div className="text-orange-500 text-h4 px-8 font-semibold">
      <p>Daily Order</p>
      <div className="text-h1 text-center font-bold">{numDayOrder}</div>
    </div>
  );
};

const WeeklyOrder = () => {
  const [numWeekOrder, setWeekOrder] = useState(0);

  useEffect(() => {
    const fetchWeeklyOrders = async () => {
      try {
        const orders = await weeklyOrder();
        setWeekOrder(orders.length); // Assuming weeklyOrder returns an array
      } catch (error) {
        console.log("Can't fetch weekly orders", error);
      }
    };

    fetchWeeklyOrders();
  }, []);

  return (
    <div className="text-blue-800 text-h4 px-4 font-semibold">
      <p>Weekly Order</p>
      <div className="text-h3 font-light">{numWeekOrder}</div>
    </div>
  );
};

const MonthlyOrder = () => {
  const [numMonthOrder, setMonthOrder] = useState(0);

  useEffect(() => {
    const fetchMonthlyOrders = async () => {
      try {
        const orders = await monthlyOrder(); // Fetch monthly orders
        setMonthOrder(orders.length); // Assuming monthlyOrder returns an array
      } catch (error) {
        console.log("Can't fetch monthly orders", error);
      }
    };

    fetchMonthlyOrders();
  }, []);

  return (
    <div className="text-blue-800 text-h4 px-4 font-semibold">
      <p>Monthly Order</p>
      <div className="text-h3 font-light">{numMonthOrder}</div>
    </div>
  );
};

const Report = () => {
  return (
    <div className="bg-orange-300 inline-block px-8 p-2 rounded-3xl shadow-lg m-2 bg-opacity-30">
      <p className="bg-red-500 font-light text-white inline-block px-2 rounded-xl">
        Report
      </p>
      <hr className="my-1" />
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
