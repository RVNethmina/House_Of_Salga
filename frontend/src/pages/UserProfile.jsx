import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaBoxOpen, FaLock, FaSignOutAlt } from 'react-icons/fa';

const UserProfile = () => {
  const { user, logout } = useAuth();
  
  // Local state for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form with user data when available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app: await authService.updateProfile(formData);
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* --- LEFT SIDEBAR: Navigation & Actions --- */}
          <div className="md:col-span-1 space-y-6">
            
            {/* User Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="h-24 w-24 bg-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-fuchsia-600">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{user?.name || 'User'}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
              
              <button 
                onClick={logout}
                className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none transition-colors"
              >
                <FaSignOutAlt className="mr-2" /> Sign Out
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100 font-semibold text-gray-700">
                Quick Links
              </div>
              <div className="divide-y divide-gray-100">
                <Link to="/orders" className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors text-gray-700">
                  <FaBoxOpen className="mr-3 text-fuchsia-500" /> My Orders
                </Link>
                <Link to="/forgot-password" className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors text-gray-700">
                  <FaLock className="mr-3 text-fuchsia-500" /> Change Password
                </Link>
              </div>
            </div>
          </div>

          {/* --- RIGHT CONTENT: Profile Details Form --- */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-fuchsia-600 hover:text-fuchsia-700 text-sm font-medium"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleUpdateProfile}>
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm ${
                          !isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm ${
                          !isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({ name: user.name || '', email: user.email || '' }); // Reset
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 disabled:opacity-70"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;