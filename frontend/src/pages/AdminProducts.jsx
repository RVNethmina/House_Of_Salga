import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBoxOpen, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const AdminProducts = () => {
  // --- Mock Data ---
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Premium T-Shirt', 
      category: 'Clothing', 
      price: 49.99, 
      stock: 120, 
      image: 'https://placehold.co/100x100/fuchsia/white?text=Shirt' 
    },
    { 
      id: 2, 
      name: 'Lifestyle Sneakers', 
      category: 'Footwear', 
      price: 129.99, 
      stock: 45, 
      image: 'https://placehold.co/100x100/fuchsia/white?text=Sneakers' 
    },
    { 
      id: 3, 
      name: 'Designer Handbag', 
      category: 'Accessories', 
      price: 399.99, 
      stock: 12, 
      image: 'https://placehold.co/100x100/fuchsia/white?text=Handbag' 
    },
    { 
      id: 4, 
      name: 'Classic Watch', 
      category: 'Accessories', 
      price: 199.50, 
      stock: 30, 
      image: 'https://placehold.co/100x100/fuchsia/white?text=Watch' 
    },
    { 
      id: 5, 
      name: 'Summer Hat', 
      category: 'Accessories', 
      price: 25.00, 
      stock: 200, 
      image: 'https://placehold.co/100x100/fuchsia/white?text=Hat' 
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // --- Handlers ---

  const handleDelete = (id) => {
    // In a real app, you would confirm with the user first
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      toast.success('Product deleted successfully');
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter(product =>
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
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full object-cover border border-gray-200" src={product.image} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-gray-500 text-xs">ID: #{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${product.stock < 20 ? 'text-red-600' : 'text-green-600'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <Link 
                          to={`/admin/products/edit/${product.id}`} 
                          className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded hover:bg-blue-50"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
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
            Total Inventory Value: <span className="font-medium text-gray-900">${filteredProducts.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}</span>
          </span>
          <span>Showing {filteredProducts.length} items</span>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;