import React, { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import MainDishes from "./MainDishes";
import BreakFast from "./BreakFast";
import Beverage from "./Beverage";
import Desserts from "./Desserts";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./store/cartSlice";
import QuantitySelector from "./QuantitySelector";

export default function DisItems({ data }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { category, img, price, title, veg, in_stock, _id } = data;

  useEffect(() => {
    // Check if the item is already in the cart and set its quantity
    const itemInCart = cart.find((item) => item.id === _id);
    if (itemInCart) {
      setQuantity(itemInCart.quantity);
      setIsAdded(true);
    } else {
      setIsAdded(false);
      setQuantity(1); // Reset quantity when the item is removed from the cart
    }
  }, [cart, _id]);

  const handleAdd = () => {
    if (!in_stock) return;
    dispatch(
      addItem({
        id: _id,
        category,
        img,
        price,
        title,
        veg,
        quantity: 1, // Start with 1 when adding for the first time
      })
    );
    setIsAdded(true);
  };

  const handleRemove = () => {
    dispatch(removeItem({ id: _id }));
    setIsAdded(false);
  };

  const handleIncrement = () => {
    const newQuantity = quantity-quantity + 1;
    setQuantity(newQuantity);
    dispatch(
      addItem({
        id: _id,
        category,
        img,
        price,
        title,
        veg,
        quantity: newQuantity,
      })
    );
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity-1-quantity;
      setQuantity(newQuantity);
      dispatch(
        addItem({
          id: _id,
          category,
          img,
          price,
          title,
          veg,
          quantity: newQuantity,
        })
      );
    } else {
      handleRemove();
    }
  };

  

  const renderContent = () => (
    <div className="p-5 bg-white rounded-lg shadow-md">
      {category.toLowerCase() === "main course" && (
        <MainDishes data={data} price={price * quantity} />
      )}
      {category.toLowerCase() === "break fast" && (
        <BreakFast data={data} price={price * quantity} />
      )}
      {category.toLowerCase() === "beverage" && (
        <Beverage data={data} price={price * quantity} />
      )}
      {category.toLowerCase() === "desserts" && (
        <Desserts data={data} price={price * quantity} />
      )}
      {isAdded ? (
        <QuantitySelector
        quantity={quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
      ) : (
        <button
          className={`w-[112px] h-10 mt-3 px-4 py-2 text-white ${
            in_stock ? "bg-blue-600" : "bg-gray-500 cursor-not-allowed w-max"
          } rounded-md`}
          onClick={handleAdd}
          disabled={!in_stock}
        >
          {in_stock ? "Add" : "Out of Stock"}
        </button>
      )}
    </div>
  );
  if (!data || data.length === 0) {
    return (
      <>
        <div className="md:max-w-3xl md:mx-auto md:my-1 flex flex-col items-center justify-center">
          <Shimmer />
          <Shimmer />
          <Shimmer />
          <Shimmer />
          <Shimmer />
        </div>
      </>
    );
  } else {
    return (
      data && (
        <div className="md:max-w-3xl md:mx-auto md:my-1">{renderContent()}</div>
      )
    );
  }
}