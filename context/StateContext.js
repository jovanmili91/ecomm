import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    if (checkProductInCart) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id
            ? {
                ...x,
                quantity: x.quantity + quantity,
              }
            : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (product, value) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (value === "inc") {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );

      setTotalPrice((prevTotalPrice) => prevTotalPrice + exist.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (exist.quantity > 1) {
        setCartItems(
          cartItems.map((x) =>
            x._id === product._id
              ? { ...exist, quantity: exist.quantity - 1 }
              : x
          )
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - exist.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
