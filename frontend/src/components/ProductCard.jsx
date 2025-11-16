import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Handle adding to cart and show a success notification
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (!product) {
    return null;
  }

  return (
    <div className="group bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
          onError={(e) => { e.target.src = 'https://placehold.co/400x400/f8f8f8/cccccc?text=Image+Not+Found'; }}
        />
        {/* Quick view overlay (optional) */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-white py-2 px-4 rounded-full">
            View Details
          </span>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-lg font-bold text-fuchsia-600 mt-1">
          ${product.price.toFixed(2)}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full flex items-center justify-center bg-fuchsia-600 text-white py-2 px-4 rounded-lg font-semibold
                     hover:bg-fuchsia-700 focus:outline-none focus:ring-2
                     focus:ring-fuchsia-500 focus:ring-offset-2 transition-colors duration-300"
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;