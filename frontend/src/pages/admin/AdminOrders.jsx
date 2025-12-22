import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaBoxOpen, FaSearch, FaFilter } from 'react-icons/fa';
import { useOrders } from '../../context/OrderContext';

const AdminOrders = () => {
  
  const { adminOrders, getAllOrders, updateOrderStatus, currency } = useOrders();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  // Fetch orders on mount
  useEffect(() => {
    getAllOrders();
  }, []);

  // Sync local state when adminOrders changes
  useEffect(() => {
    if (adminOrders) {
      setOrders(adminOrders);
    }
  }, [adminOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    // Call the context function to update backend
    await updateOrderStatus(orderId, newStatus);
    // Local state will update automatically because getAllOrders is called inside updateOrderStatus
  };

  // Filter logic
  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(order => order.status === filter);

  // Helper for status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Packing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Out for delivery': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-10">
      <title>Admin Orders</title>
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaBoxOpen className="mr-3 text-fuchsia-600" /> 
            Order Management
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage all customer orders.
          </p>
        </div>
        
        {/* Search Bar (Visual only for now) */}
        <div className="mt-4 md:mt-0 relative">
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent w-full md:w-64"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {['All', 'Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              filter === status 
                ? 'bg-fuchsia-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Items</th>
                <th className="px-6 py-4 font-semibold">Total Price</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {order.address.firstName} {order.address.lastName}
                      </div>
                      <div className="text-gray-500 text-xs">{order.address.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.items.length} items</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {currency}{order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold ${order.payment ? 'text-green-600' : 'text-yellow-600'}`}>
                        {order.payment ? 'Paid' : 'Pending'}
                      </span>
                      <div className="text-xs text-gray-400">{order.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="bg-white border border-gray-300 text-gray-700 text-xs rounded p-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 cursor-pointer"
                        disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <FaFilter className="w-8 h-8 text-gray-300 mb-2" />
                      <p>No orders found with status "{filter}".</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Visual Only) */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredOrders.length}</span> results
          </span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;