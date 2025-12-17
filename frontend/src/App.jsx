import React from 'react';
// We import special tools from 'react-router-dom' to handle navigation
// Routes: A container for all our potential pages
// Route: Defines a specific URL path and what component to show
// Outlet: A placeholder where child routes will be rendered (used in Protected Routes)
// Navigate: A component that forces the browser to go to a different URL (used for redirects)
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

// ToastContainer is the popup notification box
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// We need to know WHO is logged in to decide where they can go
import { useAuth } from './context/AuthContext';

// Layout is our "Frame" (Navbar + Footer). It wraps content.
import Layout from './components/Layout';

// --- Page Imports (These are the actual pages users see) ---
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
import ForgetPassWordPage from './pages/ForgetPassWordPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ReviewsSection from './pages/ReviewsSection';
import WishlistPage from './pages/WishList';

/**
 * --- COMPONENT: CustomerRoute ---
 * This acts as a "Security Guard" for customer-only pages.
 * It doesn't have its own UI. It just checks permissions.
 */
const CustomerRoute = () => {
  // 1. Get the current role and loading status from our AuthContext
  const { role, isAuthLoading } = useAuth();

  // 2. If we are still checking who the user is, wait.
  //    Otherwise, we might accidentally kick them out before we know they are logged in.
  if (isAuthLoading) {
    return <div>Loading authentication...</div>; 
  }

  // 3. The Logic Check:
  if (role === 'customer') {
    // SUCCESS: The user is a customer.
    // <Outlet /> is a special placeholder. It means:
    // "Render the CHILD route that matched the URL right here."
    // Example: If URL is /profile, <Outlet /> becomes <UserProfile />
    return <Outlet />; 
  } else {
    // FAIL: The user is NOT a customer (maybe a visitor or admin).
    // <Navigate /> forces the browser to go to /login immediately.
    // 'replace' means "don't save the restricted page in history" (so back button works).
    return <Navigate to="/login" replace />; 
  }
};

/**
 * --- COMPONENT: AdminRoute ---
 * Same concept as CustomerRoute, but checks for 'admin' role.
 */
const AdminRoute = () => {
  const { role, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div>Loading authentication...</div>; 
  }

  if (role === 'admin') {
    return <Outlet />; // Render the admin page requested
  } else {
    return <Navigate to="/admin/login" replace />; // Kick them out to admin login
  }
};

/**
 * --- MAIN APP COMPONENT ---
 * This is the root of your UI tree.
 */
function App() {
  return (
    // <Layout> wraps EVERYTHING. 
    // This ensures the Navbar and Footer are visible on EVERY page.
    <Layout>
      
      {/* <Routes> holds all the possible paths for your app */}
      <Routes>
        
        {/* --- PUBLIC ROUTES --- */}
        {/* These routes are open to everyone. No security guard. */}
        {/* 'path' is the URL, 'element' is the component to show */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        
        {/* :id is a "URL Parameter". It grabs whatever value is there (e.g., /product/123) */}
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/forgot-password" element={<ForgetPassWordPage /> } />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reviews" element={<ReviewsSection />} />
        

        {/* --- CUSTOMER PROTECTED ROUTES --- */}
        {/* This is a "Nested Route". 
           The PARENT route uses the security guard (<CustomerRoute />).
           The CHILD routes are the specific pages.
           
           HOW IT WORKS:
           1. User goes to /profile
           2. React Router sees it's inside the CustomerRoute parent.
           3. It runs CustomerRoute code FIRST.
           4. If CustomerRoute returns <Outlet />, THEN it renders <UserProfile />.
        */}
        <Route element={<CustomerRoute />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/order-details" element={<OrderDetailsPage />}  />
          <Route path="/order-history" element={<OrderHistoryPage/>} />
          <Route path="/product-details" element={<ProductDetailsPage />} />
          <Route path="/wishlist" element={<WishlistPage />}/>
        </Route>

        {/* --- ADMIN PROTECTED ROUTES --- */}
        {/* Same logic. You must pass the AdminRoute check to see any of these pages. */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>

        {/* --- FALLBACK ROUTE --- */}
        {/* path="*" matches ANY URL that hasn't been matched above. */}
        {/* This is your 404 page catcher. */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      {/* This component sits here quietly and waits to show popup messages */}
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