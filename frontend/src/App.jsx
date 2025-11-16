import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';

// page imports
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AdminLoginPage from './pages/AdminLoginPage';
import NotFoundPage from './pages/NotFoundPage';
import UserProfile from './pages/UserProfile';
import OrderHistoryPage from './pages/OrderHistoryPage';
import CheckOut from './pages/CheckOut';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';


/**
 * CUSTOMER PROTECTED ROUTE
 * Only allows access if role is 'customer'.
 * Redirects to customer login page if not.
 */
const CustomerRoute = () => {
  const { role, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div>Loading authentication...</div>; // Or a spinner component
  }

  if (role === 'customer') {
    return <Outlet />; // Render the child route (e.g., ProfilePage)
  } else {
    // Redirect to customer login, saving the location they tried to access
    return <Navigate to="/login" replace />;
  }
};


/**
 * ADMIN PROTECTED ROUTE
 * Only allows access if role is 'admin'.
 * Redirects to admin login page if not.
 */
const AdminRoute = () => {
  const { role, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div>Loading authentication...</div>; // Or a spinner component
  }

  if (role === 'admin') {
    return <Outlet />; // Render the child route (e.g., AdminDashboard)
  } else {
    // Redirect to admin login
    return <Navigate to="/admin/login" replace />;
  }
};


function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Customer Protected Routes */}
        <Route element={<CustomerRoute />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  )
}

export default App
