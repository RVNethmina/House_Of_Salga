import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa';

const ShopPage = () => {
  const { products, loading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle

  // Categories (Mock - in real app, fetch from API or unique values from products)
  const categories = ['All', 'Clothing', 'Footwear', 'Accessories'];

  // Apply Filters & Sorting
  useEffect(() => {
    let result = [...products];

    // 1. Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 3. Sort
    if (sortOption === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Shop Collection</h1>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- Sidebar Filters (Desktop) & Mobile Toggle --- */}
          <div className="lg:w-64 flex-shrink-0">
            {/* Mobile Filter Button */}
            <button
              className="lg:hidden w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mb-4"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" /> Filters
            </button>

            {/* Filter Content */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block bg-white p-6 rounded-xl shadow-sm border border-gray-200`}>
              <div className="flex justify-between items-center lg:hidden mb-4">
                <h3 className="font-bold text-gray-900">Filters</h3>
                <button onClick={() => setShowFilters(false)}><FaTimes /></button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-2 py-1 rounded transition-colors ${
                          selectedCategory === category 
                            ? 'bg-fuchsia-50 text-fuchsia-600 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Sort By</h3>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 text-sm p-2"
                >
                  <option value="default">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* --- Product Grid --- */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-500 text-lg">Loading products...</div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                  className="mt-4 text-fuchsia-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShopPage;