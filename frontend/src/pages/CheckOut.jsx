import React, { useState } from "react"
import { FiShoppingBag, FiSearch, FiUser } from "react-icons/fi"


// Form input
const FormInput = ({ id, label, placeholder, defaultValue, type = "text" }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="w-full rounded-lg border-gray-300 p-3 text-sm shadow-sm focus:border-gray-500 focus:ring-gray-500"
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  </div>
)

// Payment option
const PaymentOption = ({ id, label, selectedPaymentMethod, onChange }) => (
  <div
    className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${selectedPaymentMethod === id ? "border-black ring-1 ring-black" : "border-gray-300"}`}
    onClick={() => onChange(id)}
  >
    <label htmlFor={id} className="text-sm font-medium text-gray-900 cursor-pointer">
      {label}
    </label>
    <input
      type="radio"
      name="paymentMethod"
      id={id}
      checked={selectedPaymentMethod === id}
      onChange={() => onChange(id)}
      className="h-4 w-4 text-black focus:ring-black border-gray-300"
    />
  </div>
)

// Order item card
const OrderItem = ({ image, name, size }) => (
  <div className="flex items-center space-x-4">
    <img src={image} alt={name} className="h-16 w-16 rounded-lg bg-gray-100 object-cover" />
    <div>
      <p className="font-medium text-gray-900">{name}</p>
      <p className="text-sm text-gray-500">{size}</p>
    </div>
  </div>
)

// Logo
const SalagaLogo = () => (
  <div className="flex items-center space-x-2 cursor-pointer">
    <svg className="w-7 h-7 text-fuchsia-600 hover:text-fuchsia-700" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.757 2.243a.75.75 0 00-1.514 0L.936 12.55a.75.75 0 000 .899l10.307 10.308a.75.75 0 001.514 0l10.307-10.308a.75.75 0 000-.899L12.757 2.243z"/>
    </svg>
    
    <span className="text-2xl font-bold text-fuchsia-600 hover:text-fuchsia-700">House of Salaga</span>
  </div>
);

// Header
const Header = () => {
  const navItems = ["New Arrivals", "Featured", "Men", "Women", "Accessories", "Sale"]
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

  )
}

// Main page
export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const orderItems = [
    { image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=128&h=128&q=80", name: "Classic White Tee", size: "Size M" },
    { image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=128&h=128&q=80", name: "Navy Blue Jeans", size: "Size L" },
    { image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=128&h=128&q=80", name: "Black Sneakers", size: "Size 8" }
  ]
 
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 mb-6">
          Shopping Bag / <span className="font-medium text-black">Checkout</span>
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>

        <form className="mt-12">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 ">

            <div className="sm:col-span-2">
              <FormInput id="email" label="Email" placeholder="email@example.com"  />
            </div>

            <div className="sm:col-span-2">
              <FormInput id="phone" label="Phone" placeholder="(555) 123-4567"  />
            </div>

            <FormInput id="first-name" label="First Name" placeholder="Liam"  />
            <FormInput id="last-name" label="Last Name" placeholder="Smith"  />

            <div className="sm:col-span-2">
              <FormInput id="address" label="Address" placeholder="123 Elm Street"  />
            </div>

            <div className="sm:col-span-2">
              <FormInput id="city" label="City" placeholder="Anytown"  />
            </div>

            <FormInput id="state" label="State" placeholder="CA"  />
            <FormInput id="zip-code" label="Zip Code" placeholder="90210" />
          </div>

          <div className="mt-10 border-t border-gray-200 pt-10">
            <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
            <div className="mt-6 space-y-4">
              <PaymentOption id="credit-card" label="Credit Card" selectedPaymentMethod={paymentMethod} onChange={setPaymentMethod} />
              <PaymentOption id="paypal" label="PayPal" selectedPaymentMethod={paymentMethod} onChange={setPaymentMethod} />
              <PaymentOption id="cod" label="Cash on Delivery" selectedPaymentMethod={paymentMethod} onChange={setPaymentMethod} />
            </div>
          </div>

          {paymentMethod === "credit-card" && (
            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
              <div className="sm:col-span-4">
                <FormInput id="card-number" label="Card Number" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="sm:col-span-2">
                <FormInput id="expiry-date" label="Expiry Date" placeholder="MM/YY"  />
              </div>
              <div className="sm:col-span-2">
                <FormInput id="cvv" label="CVV" placeholder="123"  />
              </div>
            </div>
          )}

          <div className="mt-10 border-t border-gray-200 pt-10">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-6 space-y-4">
              {orderItems.map(item => (
                <OrderItem key={item.name} {...item} />
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><p>Subtotal</p><p>$150.00</p></div>
              <div className="flex justify-between"><p>Shipping</p><p>Free</p></div>
              <div className="flex justify-between text-base font-medium text-gray-900"><p>Total</p><p>$150.00</p></div>
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="w-full rounded-lg bg-fuchsia-600 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
