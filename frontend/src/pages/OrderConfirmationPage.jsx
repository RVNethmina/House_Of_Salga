import React from 'react';
import { FiSearch, FiUser, FiShoppingBag } from 'react-icons/fi';

// --- MOCK DATA ---
const orderData = {
  orderNumber: '#123456789',
  orderDate: 'July 20, 2024',
  shippingAddress: ['123 Elm Street', 'Anytown, CA 91234'],
  billingAddress: ['123 Elm Street', 'Anytown, CA 91234'],
  paymentMethod: 'Visa ending in 1234',
  items: [
    {
      id: 1,
      name: 'Classic Cotton T-Shirt',
      size: 'Size M',
      price: 25,
      imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=128&h=128&q=80',
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      size: 'Size 32',
      price: 75,
      imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=128&h=128&q=80',
    },
    {
      id: 3,
      name: 'Leather Sneakers',
      size: 'Size 9',
      price: 100,
      imageUrl: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=128&h=128&q=80',
    },
  ],
  subtotal: 200,
  shipping: 5,
  tax: 15,
  total: 220,
};

// --- SalagaLogo ---

const SalagaLogo = () => (
  <div className="flex items-center space-x-2 cursor-pointer">
    <svg className="w-7 h-7 text-fuchsia-600 hover:text-fuchsia-700" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.757 2.243a.75.75 0 00-1.514 0L.936 12.55a.75.75 0 000 .899l10.307 10.308a.75.75 0 001.514 0l10.307-10.308a.75.75 0 000-.899L12.757 2.243z"/>
    </svg>
    
    <span className="text-2xl font-bold text-fuchsia-600 hover:text-fuchsia-700">House of Salaga</span>
  </div>
);
// --- Header ---

const Header = () => {
  const navItems = ['New Arrivals', 'Featured', 'Men', 'Women', 'Accessories', 'Sale'];
  return (
<header className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-20">
      <SalagaLogo />
      <div className="flex items-center space-x-8">
        <nav className="hidden md:flex md:space-x-8">
          {navItems.map(item => (
            <a key={item} href="#" className="text-gray-600 hover:text-fuchsia-700 font-medium">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-300 cursor-pointer">
            <FiSearch className="h-5 w-5 text-fuchsia-600 hover:text-fuchsia-700" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-300 cursor-pointer">
            <FiUser className="h-5 w-5 text-fuchsia-600 hover:text-fuchsia-700" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-300 cursor-pointer">
            <FiShoppingBag className="h-5 w-5 text-fuchsia-600 hover:text-fuchsia-700" />
          </button>
        </div>
      </div>

      
    </div>
  </div>
</header>


  );
};

const OrderItem = ({ item }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-20 w-20 rounded-lg object-cover mr-6 bg-gray-100"
      />
      <div>
        <p className="font-semibold text-gray-900">{item.name}</p>
        <p className="text-sm text-gray-600">{item.size}</p>
      </div>
    </div>
    <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
  </div>
);

const OrderConfirmationPage = () => (
  <div className="bg-white min-h-screen font-sans text-gray-800">
    <Header />
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Thank you for your order!</h1>
        <p className="text-gray-600 text-lg">
          Your order {orderData.orderNumber} has been placed and is on its way. You will receive an email confirmation shortly.
        </p>
      </div>

      <div className="space-y-12">
        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
          <div className="divide-y divide-gray-200">
            <div className="grid grid-cols-2 gap-4 py-6">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className=" text-gray-900 mt-1">{orderData.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className=" text-gray-900 mt-1">{orderData.orderDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 py-6">
              <div>
                <p className="text-sm text-gray-600">Shipping Address</p>
                <address className="not-italic text-gray-900 mt-1 space-y-1">
                  {orderData.shippingAddress.map((line, index) => <span key={index} className="block">{line}</span>)}
                </address>
              </div>
              <div>
                <p className="text-sm text-gray-600">Billing Address</p>
                <address className="not-italic text-gray-900 mt-1 space-y-1">
                  {orderData.billingAddress.map((line, index) => <span key={index} className="block">{line}</span>)}
                </address>
              </div>
            </div>
            <div className="py-6">
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className=" text-gray-900 mt-1">{orderData.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Items Ordered</h2>
          <div className="space-y-6">
            {orderData.items.map(item => <OrderItem key={item.id} item={item} />)}
          </div>
        </div>

        {/* Total */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Total</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="font-medium text-gray-900">${orderData.subtotal.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="font-medium text-gray-900">${orderData.shipping.toFixed(2)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-sm text-gray-600">Tax</p>
                <p className="font-medium text-gray-900">${orderData.tax.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="font-bold text-xl text-gray-900">${orderData.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button className="w-full rounded-lg bg-fuchsia-600 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 cursor-pointer">
          View Order Details
        </button>
      </div>
    </main>
  </div>
);

export default OrderConfirmationPage; 