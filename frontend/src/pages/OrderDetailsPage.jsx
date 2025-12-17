import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaBox, FaTruck, FaCreditCard, FaMapMarkerAlt } from 'react-icons/fa';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching order details from API based on ID
    const fetchOrderDetails = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay

      // Mock Data
      const mockOrder = {
        id: id || '#ORD-123456', // Use ID from URL or fallback
        date: 'October 25, 2023',
        status: 'Shipped',
        total: 189.99,
        items: [
          { id: 1, name: 'Premium T-Shirt', price: 49.99, quantity: 2, image: 'https://placehold.co/100x100/fuchsia/white?text=Shirt' },
          { id: 2, name: 'Lifestyle Sneakers', price: 129.99, quantity: 1, image: 'https://placehold.co/100x100/fuchsia/white?text=Sneakers' },
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Fashion St, Apt 4B',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA'
        },
        paymentMethod: 'Stripe (Credit Card)',
        shippingFee: 10.00,
        subtotal: 229.97 // (49.99*2 + 129.99)
      };
      
      setOrder(mockOrder);
      setLoading(false);
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
        <Link to="/orders" className="text-fuchsia-600 hover:text-fuchsia-700 font-medium">
          &larr; Back to Orders
        </Link>
      </div>
    );
  }

  // Helper for status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link to="/orders" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-fuchsia-600 transition-colors">
            <FaArrowLeft className="mr-2" /> Back to Order History
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              Order Details
              <span className="ml-3 text-lg font-normal text-gray-500">#{order.id}</span>
            </h1>
            <p className="text-gray-500 mt-1">
              Placed on <span className="font-medium text-gray-900">{order.date}</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-sm ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: Order Items --- */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaBox className="mr-2 text-fuchsia-500" /> Items in Your Order
                </h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <li key={item.id} className="p-6 flex items-start">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                        <p className="text-base font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-500">Unit Price: ${item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Summary & Info --- */}
          <div className="space-y-6">
            
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <dl className="space-y-3">
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Subtotal</dt>
                  <dd className="font-medium text-gray-900">${order.subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-500">Shipping</dt>
                  <dd className="font-medium text-gray-900">${order.shippingFee.toFixed(2)}</dd>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-xl font-bold text-fuchsia-600">${(order.subtotal + order.shippingFee).toFixed(2)}</dd>
                </div>
              </dl>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaTruck className="mr-2 text-gray-400" /> Delivery Info
              </h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaCreditCard className="mr-2 text-gray-400" /> Payment Info
              </h2>
              <p className="text-sm text-gray-600">
                Method: <span className="font-medium text-gray-900">{order.paymentMethod}</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;