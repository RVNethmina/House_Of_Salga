import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaStar, FaShoppingCart, FaArrowLeft, FaCheck, FaTruck, FaUndo } from 'react-icons/fa';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { getProductById, loading } = useProducts();
  const { addToCart } = useCart();
  const { user, role } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' or 'reviews'
  
  // Review Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  // Mock Reviews Data
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Alice M.', rating: 5, comment: 'Absolutely love this product! The quality is amazing.', date: '2023-10-15' },
    { id: 2, user: 'John D.', rating: 4, comment: 'Great value for money, but shipping took a bit longer.', date: '2023-10-10' },
  ]);

  useEffect(() => {
    if (!loading) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
    }
  }, [id, loading, getProductById]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
      toast.success(`Added ${qty} ${product.name}(s) to cart!`);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Simulate adding a review
    const newReview = {
      id: reviews.length + 1,
      user: user?.name || 'Anonymous User',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([newReview, ...reviews]);
    setComment('');
    setRating(5);
    toast.success('Review submitted successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-fuchsia-600 hover:text-fuchsia-700 font-medium">
          &larr; Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-fuchsia-600 mb-8 transition-colors">
          <FaArrowLeft className="mr-2" /> Back to Shop
        </Link>

        {/* --- Product Main Section --- */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 lg:flex mb-10">
          
          {/* Product Image */}
          <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-[500px] w-auto object-contain rounded-lg shadow-sm"
              onError={(event) => { event.target.src = 'https://placehold.co/500x500/f8f8f8/cccccc?text=Product+Image'; }}
            />
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
            <div className="flex-1">
              <p className="text-sm text-fuchsia-600 font-bold uppercase tracking-wide mb-2">
                {product.category || 'Premium Collection'}
              </p>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              
              {/* Rating Summary */}
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < 4 ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="ml-2 text-gray-500 text-sm">({reviews.length} reviews)</span>
              </div>

              <p className="text-3xl font-bold text-gray-900 mb-6">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description || "Experience the perfect blend of style and comfort with this premium item. Crafted with attention to detail and high-quality materials, it's designed to elevate your everyday look."}
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-lg w-32">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 w-full rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-center w-full font-medium">{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 w-full rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-fuchsia-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-fuchsia-700 shadow-lg shadow-fuchsia-500/30 transition-all flex items-center justify-center transform active:scale-95"
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>

              {/* Features / Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 border-t border-gray-200 pt-6">
                <div className="flex items-center">
                  <FaTruck className="text-fuchsia-500 mr-2" /> Free Shipping over $50
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-fuchsia-500 mr-2" /> In Stock & Ready to Ship
                </div>
                <div className="flex items-center">
                  <FaUndo className="text-fuchsia-500 mr-2" /> 30-Day Return Policy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Tabs Section (Description & Reviews) --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('description')}
              className={`flex-1 py-4 text-center font-medium text-sm sm:text-base transition-colors ${
                activeTab === 'description' 
                  ? 'text-fuchsia-600 border-b-2 border-fuchsia-600 bg-fuchsia-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-4 text-center font-medium text-sm sm:text-base transition-colors ${
                activeTab === 'reviews' 
                  ? 'text-fuchsia-600 border-b-2 border-fuchsia-600 bg-fuchsia-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-10">
            {activeTab === 'description' ? (
              <div className="prose max-w-none text-gray-600">
                <p>
                  Elevate your lifestyle with the <strong>{product.name}</strong>. Designed for those who appreciate fine quality and timeless aesthetics, this product stands out in both functionality and style.
                </p>
                <h3 className="text-gray-900 font-bold mt-6 mb-2">Key Features:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>High-quality materials ensuring durability and longevity.</li>
                  <li>Modern design that fits perfectly with contemporary trends.</li>
                  <li>Versatile usage suitable for various occasions.</li>
                  <li>Easy maintenance and care.</li>
                </ul>
                <p className="mt-6">
                  Whether you're buying it for yourself or as a thoughtful gift, the {product.name} is a choice you won't regret. Experience the House of Salaga difference today.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Reviews List */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">{review.user}</span>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex text-yellow-400 text-sm mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-200'} />
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No reviews yet. Be the first to write one!</p>
                  )}
                </div>

                {/* Write a Review Form */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
                  {user && role === 'customer' ? (
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className={`text-2xl focus:outline-none transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                        <textarea
                          id="comment"
                          rows="4"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 p-3 text-sm"
                          placeholder="Tell us what you liked or didn't like..."
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                      >
                        Submit Review
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-600 mb-4">Please log in as a customer to write a review.</p>
                      <Link 
                        to="/login"
                        className="inline-block bg-fuchsia-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-fuchsia-700 transition-colors"
                      >
                        Login Now
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;