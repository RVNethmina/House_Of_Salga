import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const { cToken, aToken } = useAuth();
  const { clearCart } = useCart();
  
  const [orders, setOrders] = useState([]); // For Customer
  const [adminOrders, setAdminOrders] = useState([]); // For Admin
  const [currency, setCurrency] = useState('$');
  const [delivery_fee, setDeliveryFee] = useState(10);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api';

  // --- Customer Actions ---

  // Place Order (COD)
  const placeOrder = async (items, amount, address) => {
    try {
      if (!cToken) return null;

      let orderData = {
        items,
        amount,
        address
      }

      const response = await axios.post(`${backendUrl}/order/place`, orderData, { headers: { Authorization: `Bearer ${cToken}` } })
      
      if (response.data.success) {
        toast.success(response.data.message);
        clearCart(); // Clear local cart
        getUserOrders(); // Refresh order list
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return false;
    }
  }

  // Get User Orders
  const getUserOrders = async () => {
    try {
      if (!cToken) return;
      
      const response = await axios.post(`${backendUrl}/order/userorders`, {}, { headers: { Authorization: `Bearer ${cToken}` } })
      
      if (response.data.success) {
        // Reverse to show newest first
        setOrders(response.data.orders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }

  // --- Admin Actions ---

  // Get All Orders
  const getAllOrders = async () => {
    try {
      if (!aToken) return;

      const response = await axios.post(`${backendUrl}/order/list`, {}, { headers: { Authorization: `Bearer ${aToken}` } })
      
      if (response.data.success) {
        setAdminOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Update Status
  const updateOrderStatus = async (orderId, status) => {
    try {
      if (!aToken) return;

      const response = await axios.post(`${backendUrl}/order/status`, { orderId, status }, { headers: { Authorization: `Bearer ${aToken}` } })
      
      if (response.data.success) {
        await getAllOrders(); // Refresh list
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const value = {
    orders,
    adminOrders,
    currency,
    delivery_fee,
    placeOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};