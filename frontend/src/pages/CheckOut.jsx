import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaCreditCard, FaMoneyBillWave, FaLock } from 'react-icons/fa';

const CheckOut = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [method, setMethod] = useState('cod'); // 'cod' or 'stripe'
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  // Calculation Logic (Same as Cart Page for consistency)
  const subtotal = parseFloat(getCartTotal());
  const shippingFee = subtotal > 50 ? 0 : 10;
  const total = subtotal + shippingFee;

  // Handle Order Placement
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock API Call simulation
    try {
      // 1. Validate Form (Basic check)
      if (!formData.street || !formData.city || !formData.phone) {
        toast.error("Please fill in all required shipping fields.");
        setLoading(false);
        return;
      }

      // 2. Simulate Network Request
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 3. Success Handling
      toast.success("Order placed successfully!");
      clearCart();
      navigate('/order-success'); // Navigate to confirmation page
      
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    // Redirect if cart is empty (prevent direct access)
    // Using a timeout to ensure render doesn't break
    setTimeout(() => navigate('/shop'), 0);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <title>CheckOut</title>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
        
        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT SIDE: Delivery Information --- */}
          <div className="flex-1 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                Delivery Information
              </h2>
              
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {/* Name Fields */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                  <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 py-2 px-3 border" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                  <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 py-2 px-3 border" />
                </div>

                {/* Email (Full Width) */}
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input required onChange={onChangeHandler} name="email" value={formData.email} type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 py-2 px-3 border" />
                </div>

                {/* Address (Full Width) */}
                <div className="sm:col-span-2">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street address</label>
                  <input required onChange={onChangeHandler} name="street" value={formData.street} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 py-2 px-3 border" />
                </div>

                {/* City & State */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input required onChange={onChangeHandler} name="city" value={formData.city} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 py-2 px-3 border" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                  <input required onChange={onChangeHandler} name="state" value={formData.state} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 py-2 px-3 border" />
                </div>

                {/* Zip & Country */}
                <div>
                  <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                  <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 py-2 px-3 border" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                  <input required onChange={onChangeHandler} name="country" value={formData.country} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 py-2 px-3 border" />
                </div>

                {/* Phone (Full Width) */}
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input required onChange={onChangeHandler} name="phone" value={formData.phone} type="tel" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 py-2 px-3 border" />
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: Order Summary & Payment --- */}
          <div className="lg:w-96 space-y-8">
            
            {/* Cart Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.quantity} x ${item.price}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="space-y-4 border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">
                    {shippingFee === 0 ? <span className="text-green-600">Free</span> : `$${shippingFee}`}
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-xl font-bold text-fuchsia-600">${total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-4">
                {/* Stripe Selection */}
                <div 
                  onClick={() => setMethod('stripe')} 
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${method === 'stripe' ? 'border-fuchsia-500 bg-fuchsia-50 ring-1 ring-fuchsia-500' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <input type="radio" name="payment" className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300" checked={method === 'stripe'} readOnly />
                  <div className="ml-3 flex items-center">
                    <FaCreditCard className="text-gray-600 mr-2" />
                    <span className="block text-sm font-medium text-gray-900">Stripe (Credit Card)</span>
                  </div>
                </div>

                {/* Cash on Delivery Selection */}
                <div 
                  onClick={() => setMethod('cod')} 
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${method === 'cod' ? 'border-fuchsia-500 bg-fuchsia-50 ring-1 ring-fuchsia-500' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <input type="radio" name="payment" className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300" checked={method === 'cod'} readOnly />
                  <div className="ml-3 flex items-center">
                    <FaMoneyBillWave className="text-green-600 mr-2" />
                    <span className="block text-sm font-medium text-gray-900">Cash on Delivery</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-fuchsia-600 text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-fuchsia-700 shadow-lg shadow-fuchsia-500/30 transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <FaLock className="mr-2 h-4 w-4" /> Place Order
                  </>
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;