import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaEnvelope } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      
      {/* Icon Container */}
      <div className="bg-white p-4 rounded-full shadow-sm mb-6 inline-flex">
        <FaExclamationTriangle className="h-16 w-16 text-fuchsia-500" />
      </div>

      {/* Error Message */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-2">
        404
      </h1>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
        Oops! The page you are looking for doesn't exist or has been moved. 
        Let's get you back on track.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm">
        <Link
          to="/"
          className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 transition-colors shadow-lg shadow-fuchsia-500/30"
        >
          <FaHome className="mr-2" />
          Go Home
        </Link>
        
        <Link
          to="/contact"
          className="flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors shadow-sm"
        >
          <FaEnvelope className="mr-2 text-gray-400" />
          Contact Support
        </Link>
      </div>

      {/* Decorative Background Elements (Optional) */}
      <div className="mt-12 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} House of Salaga. All rights reserved.
      </div>
    </div>
  );
};

export default NotFoundPage;