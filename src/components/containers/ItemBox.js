import React, { useState, useEffect } from "react";
import { getFood } from "../../api/API";
import ItemCard from "../ItemCard";

const ItemsBox = ({ user, setSelected, setOrder, setEdit }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await getFood();
        setFoods(response.data || []);
      } catch (err) {
        console.error("Error fetching food items:", err);
        setError("Failed to fetch food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading)
    return (
      <p className="text-center p-10 text-gray-500 text-3xl font-mono w-full">
        Loading food items...
      </p>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-wrap w-full">
      {foods && foods.length > 0 ? (
        foods
          .filter((food) => {
            // Admin sees all, user sees only available
            if (user && user.role === "ROLE_ADMIN") return true;
            return food.isAvailable === true;
          })
          .map((food) => (
            <ItemCard
              key={food.id}
              id={food.id}
              name={food.name}
              description={food.description}
              price={food.price}
              quantity={food.quantity}
              src={food.imageUrl}
              isAvailable={food.isAvailable}
              user={user}
              setSelected={setSelected}
              setOrder={setOrder}
              setEdit={setEdit}
            />
          ))
      ) : (
        <p>No items available.</p>
      )}
    </div>
  );
};

export default ItemsBox;
