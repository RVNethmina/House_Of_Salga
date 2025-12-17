import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = parseFloat(getCartTotal());
  const shippingFee = subtotal > 50 ? 0 : 10; // Example: Free shipping over $50
  const total = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <title>Cart</title>
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-fuchsia-100 mb-6">
            <FaShoppingBag className="h-10 w-10 text-fuchsia-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors w-full"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <title>Cart</title>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          Shopping Cart
          <span className="ml-3 text-lg font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- Cart Items List (Left Column) --- */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Product Image */}
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                        onError={(e) => { e.target.src = 'https://placehold.co/100x100/f8f8f8/cccccc?text=No+Image'; }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between self-stretch">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link to={`/product/${item.id}`} className="hover:text-fuchsia-600 transition-colors">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="ml-4 text-lg font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.category || 'General'}</p>
                        <p className="mt-1 text-sm text-gray-500">Unit Price: ${item.price.toFixed(2)}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:text-fuchsia-600 hover:bg-gray-50 rounded-l-lg transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-1 text-gray-900 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-fuchsia-600 hover:bg-gray-50 rounded-r-lg transition-colors"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-red-500 hover:text-red-700 flex items-center transition-colors"
                        >
                          <FaTrash className="mr-2 w-4 h-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Clear Cart Button */}
              <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <Link to="/shop" className="text-fuchsia-600 hover:text-fuchsia-700 font-medium flex items-center">
                  <FaArrowLeft className="mr-2" /> Continue Shopping
                </Link>
                <button 
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700 underline"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* --- Order Summary (Right Column) --- */}
          <div className="lg:w-96">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Shipping Estimate</dt>
                  <dd className="font-medium text-gray-900">
                    {shippingFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </dd>
                </div>
                {shippingFee === 0 && (
                  <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                    Free shipping applied on orders over $50!
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-bold text-gray-900">Order Total</dt>
                  <dd className="text-xl font-bold text-fuchsia-600">${total.toFixed(2)}</dd>
                </div>
              </dl>

              <button
                onClick={() => navigate('/checkout')}
                className="mt-8 w-full bg-fuchsia-600 text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-fuchsia-700 shadow-lg shadow-fuchsia-500/30 transition-all transform hover:-translate-y-0.5"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-4 flex justify-center space-x-2">
                 {/* Trust Badges (Mock) */}
                 <div className="h-6 w-10 bg-gray-200 rounded"></div>
                 <div className="h-6 w-10 bg-gray-200 rounded"></div>
                 <div className="h-6 w-10 bg-gray-200 rounded"></div>
                 <div className="h-6 w-10 bg-gray-200 rounded"></div>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">Secure Checkout</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;