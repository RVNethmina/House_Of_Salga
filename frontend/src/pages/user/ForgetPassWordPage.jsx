import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineEmail, MdArrowBack } from 'react-icons/md';
import { HiOutlineKey } from 'react-icons/hi';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call: await authService.forgotPassword(email);
      
      setSubmitted(true);
      toast.success('Password reset link sent to your email!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <MdOutlineEmail className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-600 mb-8">
            We've sent a password reset link to <span className="font-semibold text-gray-800">{email}</span>.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.open('https://gmail.com', '_blank')}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 transition-colors"
            >
              Open Email App
            </button>
            <p className="text-sm text-gray-500">
              Didn't receive the email?{' '}
              <button 
                onClick={() => setSubmitted(false)}
                className="font-medium text-fuchsia-600 hover:text-fuchsia-500"
              >
                Click to resend
              </button>
            </p>
            <div className="pt-4">
              <Link to="/login" className="flex items-center justify-center text-gray-600 hover:text-gray-900 font-medium">
                <MdArrowBack className="mr-2" /> Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="inline-block p-4 bg-fuchsia-100 text-fuchsia-600 rounded-full">
              <HiOutlineKey className="w-8 h-8" />
            </span>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Forgot Password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdOutlineEmail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading
                  ? 'bg-fuchsia-300'
                  : 'bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500'
              } transition-colors`}
            >
              {loading ? 'Sending Link...' : 'Reset Password'}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="flex items-center justify-center mt-6">
          <Link 
            to="/login" 
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <MdArrowBack className="mr-2" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;