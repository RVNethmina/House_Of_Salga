import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FaHeart, FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

const WishlistPage = () => {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching wishlist from API or LocalStorage
    const loadWishlist = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
      
      // Check local storage first, otherwise use mock data
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      } else {
        // Mock Data for demonstration
        const mockWishlist = [
            { id: 2, name: 'Lifestyle Sneakers', price: 129.99, image: 'https://placehold.co/300x300/fuchsia/white?text=Sneakers', category: 'Footwear' },
            { id: 4, name: 'Classic Watch', price: 199.50, image: 'https://placehold.co/300x300/fuchsia/white?text=Watch', category: 'Accessories' },
        ];
        setWishlistItems(mockWishlist);
        localStorage.setItem('wishlist', JSON.stringify(mockWishlist));
      }
      setLoading(false);
    };

    loadWishlist();
  }, []);

  // Update localStorage whenever wishlist changes
  const updateLocalStorage = (items) => {
    localStorage.setItem('wishlist', JSON.stringify(items));
    setWishlistItems(items);
  };

  const handleRemoveFromWishlist = (id) => {
    const updatedList = wishlistItems.filter(item => item.id !== id);
    updateLocalStorage(updatedList);
    toast.info('Item removed from wishlist');
  };

  const handleMoveToCart = (product) => {
    addToCart(product);
    toast.success('Moved to cart!');
    handleRemoveFromWishlist(product.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg">Loading your wishlist...</div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-50 mb-6">
            <FaHeart className="h-10 w-10 text-red-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-500 mb-8">
            Save items you love here to buy them later.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors w-full"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaHeart className="text-red-500 mr-3" /> My Wishlist
            <span className="ml-3 text-lg font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
              {wishlistItems.length} items
            </span>
          </h1>
          <Link to="/shop" className="hidden sm:flex items-center text-fuchsia-600 hover:text-fuchsia-700 font-medium">
            <FaArrowLeft className="mr-2" /> Continue Shopping
          </Link>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300 group">
              
              {/* Product Image */}
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://placehold.co/300x300/f8f8f8/cccccc?text=Product'; }}
                />
                <button 
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove from Wishlist"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col h-auto">
                <div className="mb-2">
                   <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{product.category || 'General'}</span>
                   <h3 className="text-lg font-bold text-gray-900 truncate mt-1">
                     <Link to={`/product/${product.id}`} className="hover:text-fuchsia-600 transition-colors">
                       {product.name}
                     </Link>
                   </h3>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold text-fuchsia-600">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex items-center justify-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    <FaShoppingCart className="mr-2" /> Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Back Link */}
        <div className="mt-8 sm:hidden text-center">
            <Link to="/shop" className="inline-flex items-center text-fuchsia-600 hover:text-fuchsia-700 font-medium">
                <FaArrowLeft className="mr-2" /> Continue Shopping
            </Link>
        </div>

      </div>
    </div>
  );
};

export default WishlistPage;