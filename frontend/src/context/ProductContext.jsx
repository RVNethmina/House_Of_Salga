import React, { createContext, useState, useEffect, useContext } from 'react';
// In a real app, you'd import your api/productService
// import { apiGetAllProducts } from '../services/productService';

// Create the context
export const ProductContext = createContext(null);

// Create the provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // const data = await apiGetAllProducts();
        // setProducts(data);

        // --- Mock data for now ---
        setTimeout(() => {
          setProducts([
            { id: 1, name: 'Premium T-Shirt', price: 49.99, image: 'https://placehold.co/300x300/fuchsia/white?text=Shirt' },
            { id: 2, name: 'Lifestyle Sneakers', price: 129.99, image: 'https://placehold.co/300x300/fuchsia/white?text=Sneakers' },
            { id: 3, name: 'Designer Handbag', price: 399.99, image: 'https://placehold.co/300x300/fuchsia/white?text=Handbag' },
          ]);
          setLoading(false);
        }, 1000); // Simulate network delay
        // --- End Mock ---
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