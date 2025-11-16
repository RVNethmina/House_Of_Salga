import React, { createContext, useState, useEffect, useContext } from 'react';
// In a real app, you'd import your api/authService
// import { apiVerifyCustomerToken, apiVerifyAdminToken } from '../services/authService';

// Create the context
export const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cToken, setCToken] = useState(() => localStorage.getItem('cToken'));
  const [aToken, setAToken] = useState(() => localStorage.getItem('aToken'));
  const [role, setRole] = useState('visitor'); // 'visitor', 'customer', 'admin'
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Check for tokens on initial app load
  useEffect(() => {
    const validateTokens = async () => {
      setIsAuthLoading(true);
      const localCToken = localStorage.getItem('cToken');
      const localAToken = localStorage.getItem('aToken');

      // Admin role takes precedence in case both tokens exist (e.g., a dev)
      if (localAToken) {
        // In a real app, you'd verify the token with your backend here
        // const { isValid, userData } = await apiVerifyAdminToken(localAToken);
        // if (isValid) {
        //   setAToken(localAToken);
        //   setUser(userData);
        //   setRole('admin');
        // } else {
        //   localStorage.removeItem('aToken');
        // }

        // --- Mock behavior for now ---
        setUser({ name: 'Admin User' }); // Mock user
        setRole('admin');
        // --- End Mock ---
      } else if (localCToken) {
        // In a real app, you'd verify the token with your backend here
        // const { isValid, userData } = await apiVerifyCustomerToken(localCToken);
        // if (isValid) {
        //   setCToken(localCToken);
        //   setUser(userData);
        //   setRole('customer');
        // } else {
        //   localStorage.removeItem('cToken');
        // }

        // --- Mock behavior for now ---
        setUser({ name: 'Customer User' }); // Mock user
        setRole('customer');
        // --- End Mock ---
      } else {
        setRole('visitor');
      }
      setIsAuthLoading(false);
    };

    validateTokens();
  }, []);

  // --- Mock Login Functions (Replace with your API calls) ---

  // Mock Customer Login
  const customerLogin = async (email, password) => {
    // const { user, token } = await api.post('/auth/customer/login', { email, password });
    const mockToken = 'mock-customer-token-12345';
    const mockUser = { name: 'Test Customer', email };

    localStorage.setItem('cToken', mockToken);
    setCToken(mockToken);
    setUser(mockUser);
    setRole('customer');
    return true; // Indicate success
  };

  // Mock Admin Login
  const adminLogin = async (email, password) => {
    // const { user, token } = await api.post('/auth/admin/login', { email, password });
    const mockToken = 'mock-admin-token-67890';
    const mockUser = { name: 'Admin User', email };

    localStorage.setItem('aToken', mockToken);
    setAToken(mockToken);
    setUser(mockUser);
    setRole('admin');
    return true; // Indicate success
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setCToken(null);
    setAToken(null);
    localStorage.removeItem('cToken');
    localStorage.removeItem('aToken');
    setRole('visitor');
  };

  const authValue = {
    user,
    cToken,
    aToken,
    role,
    isAuthLoading,
    customerLogin,
    adminLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {!isAuthLoading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};