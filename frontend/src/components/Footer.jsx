import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div>
            <h5 className="text-2xl font-bold text-fuchsia-500 mb-4">House of Salaga</h5>
            <p className="text-sm">
              Premium lifestyle and fashion products. Experience elegance and style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="font-semibold text-gray-200 mb-4">Quick Links</h6>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-fuchsia-400 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-fuchsia-400 transition-colors">Shop</Link></li>
              <li><Link to="/cart" className="hover:text-fuchsia-400 transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Legal/Help */}
          <div>
            <h6 className="font-semibold text-gray-200 mb-4">Support</h6>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-fuchsia-400 transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-fuchsia-400 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="hover:text-fuchsia-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h6 className="font-semibold text-gray-200 mb-4">Follow Us</h6>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} House of Salaga. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;