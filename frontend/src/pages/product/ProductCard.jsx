import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = (event) => {
    event.preventDefault(); 
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const nextImage = (event) => {
    event.preventDefault(); // Prevent Link navigation
    event.stopPropagation();
    if (product.image && product.image.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.image.length);
    }
  };

  const prevImage = (event) => {
    event.preventDefault(); // Prevent Link navigation
    event.stopPropagation();
    if (product.image && product.image.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.image.length) % product.image.length);
    }
  };

  if (!product) return null;

  // Use _id because MongoDB uses underscores
  const productId = product._id;
  const images = product.image || [];
  const hasMultipleImages = images.length > 1;

  return (
    <Link to={`/product/${productId}`} className="group block bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 relative">
      
      {/* Product Image Container */}
      <div className="relative w-full h-64 overflow-hidden bg-gray-100">
        <img
          src={images.length > 0 ? images[currentImageIndex] : ''}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
          onError={(event) => { event.target.src = 'https://placehold.co/400x400/f8f8f8/cccccc?text=Image+Not+Found'; }}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-all duration-300 pointer-events-none" />

        {/* Navigation Arrows (Only if multiple images) */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
            >
              <FaChevronRight size={12} />
            </button>
          </>
        )}

        {/* Dots Indicator (Instagram style) */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-lg font-bold text-fuchsia-600 mt-1">
          ${Number(product.price).toFixed(2)}
        </p>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full flex items-center justify-center bg-fuchsia-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 transition-colors duration-300"
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;