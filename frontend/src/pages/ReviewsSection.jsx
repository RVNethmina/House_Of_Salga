import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ReviewsSection = ({ reviews, onSubmitReview }) => {
  const { user, role } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please write a comment.");
      return;
    }

    const newReview = {
      id: Date.now(), // Generate a temporary unique ID
      user: user?.name || 'Anonymous User',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    onSubmitReview(newReview);
    setComment('');
    setRating(5);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      
      {/* --- Reviews List --- */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Customer Reviews ({reviews.length})
        </h3>
        
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
              <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 italic">No reviews yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      {/* --- Write a Review Form --- */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
        
        {user && role === 'customer' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl focus:outline-none transition-transform hover:scale-110 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    title={`${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
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
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">
              Please log in as a customer to write a review.
            </p>
            <Link 
              to="/login"
              className="inline-block bg-fuchsia-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-fuchsia-700 transition-colors shadow-lg shadow-fuchsia-500/30"
            >
              Login Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;