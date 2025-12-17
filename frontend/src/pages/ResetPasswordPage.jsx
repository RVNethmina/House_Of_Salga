import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineLock, MdArrowBack } from 'react-icons/md';
import { HiOutlineKey } from 'react-icons/hi';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Get the reset token from the URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const { password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app: await authService.resetPassword(token, password);
      
      toast.success('Password reset successfully! Please login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Failed to reset password. Link may be expired.');
    } finally {
      setLoading(false);
    }
  };

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
            Set New Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* New Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={onChange}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={onChange}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
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
              {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPasswordPage;