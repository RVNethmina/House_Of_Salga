import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const CartContext = createContext(null);

// Helper function to get cart from localStorage
const getInitialCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Create the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  // quantity = 1 is default value of quantity if user didn't choose a value, if not default value is ignored.
  const addToCart = (product, quantity = 1) => {
    //if we pass a function in to setState function (here setCartItems), it gives you most most up to date state for free. React automatically injects the current cart array into prevItems.
    setCartItems( prevItems => {
      // Check: Is this product ALREADY in the cart?
      // Loop through cart. If item.id matches product.id, save it to 'existingItem'.
      // item : just a variable name for "the current thing I am looking at in the loop."
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // // SCENARIO: IT IS ALREADY THERE (Update Quantity)

        return prevItems.map(item =>

          // Check each item again...
          item.id === product.id 
          // If it's the match, return a NEW object:
            ? { ...item, quantity: item.quantity + quantity } // Overwrite quantity (e.g., 1 + 1 = 2)
            : item // If it's not the match (e.g., a different product), leave it alone.
        );
      } else {
        // SCENARIO: IT IS NEW (Add to Cart)
        
        // Create a NEW array.
        // 1. ...prevItems: Copy all existing cart items.
        // 2. Add the new object at the end.
        //    { ...product }: Copy product details (id, name, price)
        //    quantity: Add the quantity property (e.g., 1)
        return [...prevItems, 
          { ...product, 
            quantity 
          }
        ];
      } 
    });
  };

  // Remove item from cart
  // Keep every item in the cart where the ID is NOT EQUAL to the ID we want to delete."
  /*
    Input: Let's say productId (the one to delete) is "101".
    The Loop: .filter() goes through the cart one by one.
      Item A (ID: "50"): Is "50" NOT EQUAL to "101"? Yes (True). -> Keep it.
      Item B (ID: "101"): Is "101" NOT EQUAL to "101"? No (False). -> Throw it away.
      Item C (ID: "200"): Is "200" NOT EQUAL to "101"? Yes (True). -> Keep it.

    Result: The new array contains only Item A and Item C. Item B (the one clicked "remove" on) is gone because it failed the test.
  */
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get total price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Get total item count
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const cartValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};