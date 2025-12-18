import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

// Create the context
export const ProductContext = createContext(null);

// Create the provider component
export const ProductProvider = ({ children }) => {


  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api';
  

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/product/list`);

        if(response.data.success){
          setProducts(response.data.products);
        }
        else{
          console.error("Failed to fetch products:", response.data.message);
        }

        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to get a single product by ID
  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const productValue = {
    products,
    loading,
    getProductById,
  };

  return (
    <ProductContext.Provider value={productValue}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};