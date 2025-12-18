import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from './product/ProductCard'; // Import the new component
import { FaShippingFast, FaGem, FaShieldAlt } from 'react-icons/fa';

const HomePage = () => {
  const { user } = useAuth();
  const { products, loading } = useProducts();

  // Get the first 3 products as featured products
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="bg-white text-gray-900">
      {/* --- Hero Section --- */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-28 lg:py-40 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="block">Welcome, {user ? user.name : 'Style Enthusiast'}!</span>
            <span className="block text-fuchsia-500 mt-2">Find Your Signature Look</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover premium lifestyle and fashion products. Elegance, quality, and style, all in one place.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-fuchsia-600 text-white py-3 px-10 rounded-lg text-lg font-semibold
                       hover:bg-fuchsia-700 transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* --- Featured Products Section --- */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-xl mx-auto mb-12">
            Check out our most popular items and new arrivals. Hand-picked just for you.
          </p>
          
          {loading ? (
            <div className="text-center text-gray-600">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="text-fuchsia-600 font-semibold text-lg hover:text-fuchsia-500 transition-colors"
            >
              View All Products &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* --- Brand Features Section --- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <span className="inline-block p-4 bg-fuchsia-100 text-fuchsia-600 rounded-full mb-4">
                <FaGem className="w-8 h-8" />
              </span>
              <h3 className="text-2xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Only the finest materials and craftsmanship. We believe in quality you can feel.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <span className="inline-block p-4 bg-fuchsia-100 text-fuchsia-600 rounded-full mb-4">
                <FaShippingFast className="w-8 h-8" />
              </span>
              <h3 className="text-2xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Get your new favorite items delivered to your door, fast and securely.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <span className="inline-block p-4 bg-fuchsia-100 text-fuchsia-600 rounded-full mb-4">
                <FaShieldAlt className="w-8 h-8" />
              </span>
              <h3 className="text-2xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Shop with confidence. Our checkout is 100% secure and protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
            Browse our full collection and discover the perfect piece to complete your look.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-fuchsia-600 text-white py-3 px-10 rounded-lg text-lg font-semibold
                       hover:bg-fuchsia-700 transition-colors duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;