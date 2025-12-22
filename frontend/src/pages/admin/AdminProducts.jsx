import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBoxOpen, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';

const AdminProducts = () => {
  const { products } = useProducts();
  const { aToken } = useAuth();
  
  // Local state to handle filtering and optimistic deletions
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api';

  // Sync local list with context products when they load
  useEffect(() => {
    if (products) {
      setList(products);
    }
  }, [products]);

  // --- Handlers ---

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await axios.post(
        `${backendUrl}/product/remove`, 
        { id }, 
        { headers: { Authorization: `Bearer ${aToken}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Remove from local list immediately
        setList(prev => prev.filter(item => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Filter products based on search
  const filteredProducts = list.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-10">
      <title>Admin Products</title>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaBoxOpen className="mr-3 text-fuchsia-600" /> 
            Product Management
          </h1>
          <p className="text-gray-600 mt-1">
            View, add, and edit your store inventory.
          </p>
        </div>
        
        {/* Actions: Search & Add Button */}
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent w-full sm:w-64"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <Link 
            to="/admin/products/add" 
            className="flex items-center justify-center bg-fuchsia-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-fuchsia-700 transition shadow-lg shadow-fuchsia-500/30"
          >
            <FaPlus className="mr-2" /> Add Product
          </Link>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold text-center">Bestseller</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded-full object-cover border border-gray-200" 
                            src={product.image[0]} 
                            alt={product.name} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-gray-500 text-xs">ID: #{product._id.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.bestseller ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        {product.bestseller ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <Link 
                          to={`/admin/products/edit/${product._id}`} 
                          className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded hover:bg-blue-50"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    <p>No products found matching "{searchTerm}".</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer / Pagination (Visual Only) */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span>
            Total Inventory Value: <span className="font-medium text-gray-900">${filteredProducts.reduce((acc, p) => acc + (p.price), 0).toLocaleString()}</span>
          </span>
          <span>Showing {filteredProducts.length} items</span>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;