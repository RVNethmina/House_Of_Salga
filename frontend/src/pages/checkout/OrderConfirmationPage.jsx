import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaListAlt } from 'react-icons/fa';

const OrderConfirmationPage = () => {
  const location = useLocation();
  // Retrieve the orderId passed from the Checkout page via state
  // Fallback to 'Processing...' if accessed directly without state
  const { orderId } = location.state || { orderId: 'Processing...' };
  
  // Calculate a mock estimated delivery date (7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDate = deliveryDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <title>Order Success</title>
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100">
        
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6 animate-bounce-slow">
          <FaCheckCircle className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 font-medium">Order Number:</span>
            {/* Display the Real Order ID */}
            <span className="text-gray-900 font-bold text-fuchsia-600">{orderId}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-500 font-medium">Est. Delivery:</span>
            <span className="text-gray-900 font-bold">{formattedDate}</span>
          </div>
          <p className="text-xs text-gray-500 mt-4 border-t border-gray-200 pt-4">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <Link
            to="/orders"
            className="w-full flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors shadow-sm"
          >
            <FaListAlt className="mr-2" /> View My Orders
          </Link>
          
          <Link
            to="/shop"
            className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 transition-colors shadow-lg shadow-fuchsia-500/30"
          >
            <FaShoppingBag className="mr-2" /> Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmationPage;