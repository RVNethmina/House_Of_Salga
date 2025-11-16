import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';

// Helper component for active navigation links
const StyledNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block py-2 px-3 rounded md:p-0 ${
        isActive
          ? 'text-white bg-fuchsia-600 md:bg-transparent md:text-fuchsia-500'
          : 'text-gray-300 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-fuchsia-400'
      } transition-colors duration-200`
    }
  >
    {children}
  </NavLink>
);

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { role, user, logout } = useAuth();
  const { getCartItemCount } = useCart();

  const cartItemCount = getCartItemCount();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false); // Close mobile menu on logout
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const renderNavLinks = () => {
    switch (role) {
      case 'admin':
        return (
          <>
            <li onClick={handleLinkClick}>
              <StyledNavLink to="/admin/dashboard">Dashboard</StyledNavLink>
            </li>
            <li onClick={handleLinkClick}>
              <StyledNavLink to="/admin/products">Products</StyledNavLink>
            </li>
            <li onClick={handleLinkClick}>
              <StyledNavLink to="/admin/orders">Orders</StyledNavLink>
            </li>
          </>
        );
      case 'customer':
        return (
          <>
            <li onClick={handleLinkClick}>
              <StyledNavLink to="/shop">Shop</StyledNavLink>
            </li>
            <li onClick={handleLinkClick}>
              <StyledNavLink to="/orders">My Orders</StyledNavLink>
            </li>
          </>
        );
      default: // 'visitor'
        return (
          <>
            <li onClick={handleLinkClick}>
              <StyledNavLink to="/shop">Shop</StyledNavLink>
            </li>
            <li onClick={handleLinkClick}>
              <StyledNavLink to="/login">Login</StyledNavLink>
            </li>
            <li onClick={handleLinkClick}>
              <StyledNavLink to="/register">Register</StyledNavLink>
            </li>
          </>
        );
    }
  };

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-20 top-0 start-0 border-b border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand/Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-fuchsia-500 hover:text-fuchsia-400">
            House of Salaga
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>

        {/* Navigation Links (Desktop + Mobile) */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:bg-gray-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {/* Role-based links */}
            {renderNavLinks()}
          </ul>

          {/* Icons (Mobile only, shown inside the menu) */}
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700 space-y-3">
            {role === 'customer' && (
              <Link to="/profile" onClick={handleLinkClick} className="flex items-center p-2 text-gray-300 hover:text-white rounded-lg">
                <FaUser className="mr-2" /> {user?.name || 'My Profile'}
              </Link>
            )}
            {role === 'admin' && (
              <div className="flex items-center p-2 text-gray-300">
                <FaUser className="mr-2" /> Admin
              </div>
            )}
            {role !== 'admin' && (
              <Link to="/cart" onClick={handleLinkClick} className="flex items-center p-2 text-gray-300 hover:text-white rounded-lg relative">
                <FaShoppingCart className="mr-2" /> Cart
                {cartItemCount > 0 && (
                  <span className="absolute top-0 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            )}
            {(role === 'customer' || role === 'admin') && (
              <button onClick={handleLogout} className="flex items-center w-full text-left p-2 text-red-400 hover:text-red-300 rounded-lg">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            )}
          </div>
        </div>

        {/* Icons (Desktop only, shown outside the menu) */}
        <div className="hidden md:flex items-center space-x-5">
          {role !== 'admin' && (
            <Link to="/cart" className="text-gray-300 hover:text-fuchsia-400 relative">
              <FaShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          )}

          {role === 'customer' && (
            <Link to="/profile" className="text-gray-300 hover:text-fuchsia-400" title={user?.name || 'My Profile'}>
              <FaUser className="w-6 h-6" />
            </Link>
          )}

          {role === 'admin' && (
            <div className="flex items-center text-gray-300">
              <FaUser className="w-5 h-5 mr-2" />
              <span className="font-medium">Admin</span>
            </div>
          )}

          {(role === 'customer' || role === 'admin') && (
            <button onClick={handleLogout} className="text-gray-300 hover:text-red-400" title="Logout">
              <FaSignOutAlt className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;