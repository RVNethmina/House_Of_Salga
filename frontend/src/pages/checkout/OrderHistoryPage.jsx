import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const { orders, getUserOrders, currency } = useOrders();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      await getUserOrders();
      setLoading(false);
    };

    fetchOrders();
  }, []); // Run once on mount

  // Helper for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-800';
      case 'Packing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Out for delivery': return 'bg-indigo-100 text-indigo-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg">Loading your orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <title>My Orders</title>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600 mb-8">
          Welcome back, {user?.name}. Here is a history of your purchases.
        </p>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaBoxOpen className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-2 text-gray-500 max-w-sm mx-auto">
              You haven't placed any orders yet. Start shopping to find something you love.
            </p>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order._id} 
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Order Preview Image (Show first item's image) */}
                    <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-md border border-gray-200 overflow-hidden">
                       <img 
                        src={order.items[0]?.image[0]} 
                        alt="Order Item" 
                        className="h-full w-full object-cover"
                        onError={(e) => { e.target.src = 'https://placehold.co/100x100/f8f8f8/cccccc?text=No+Image'; }}
                       />
                    </div>
                    
                    {/* Order Info */}
                    <div>
                      <div className="flex items-center space-x-2">
                         <h3 className="text-lg font-medium text-gray-900">
                           <span className="hidden sm:inline">Order </span>#{order._id.slice(-6).toUpperCase()}
                         </h3>
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                         </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>{new Date(order.date).toDateString()}</p>
                        <span className="mx-2">&bull;</span>
                        <p>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-gray-900 sm:hidden">
                        Total: {currency}{order.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Total & Button */}
                  <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                    <div className="hidden sm:block text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-lg font-bold text-gray-900">{currency}{order.amount.toFixed(2)}</p>
                    </div>
                    
                    <Link
                      to={`/orders/${order._id}`} 
                      className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 transition-colors"
                    >
                      View Details <FaChevronRight className="ml-2 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;