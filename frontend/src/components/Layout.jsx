import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar is fixed at the top */}
      <NavBar />

      {/* Main content area */}
      {/* 'flex-grow' makes this element take up all available space, pushing the footer down */}
      <main className="flex-grow pt-16"> 
        {/* pt-16 is placeholder for navbar height. Adjust as needed. */}
        {children}
      </main>

      {/* Footer is at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;