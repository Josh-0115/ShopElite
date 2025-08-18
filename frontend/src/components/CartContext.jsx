import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  }, [cartItems]);

  const handleAddToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.gender === product.gender
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.gender === product.gender
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const increaseQuantity = useCallback((id, gender) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.gender === gender
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((id, gender) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.gender === gender && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0) // Remove item if quantity becomes 0
    );
  }, []);

  const removeItem = useCallback((id, gender) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.gender === gender))
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      cartItems,
      cartCount,
      handleAddToCart,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
    }),
    [cartItems, cartCount, handleAddToCart, increaseQuantity, decreaseQuantity, removeItem]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};