import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AddProducts = () => {
  const { aToken , backendUrl } = useAuth();
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Image State
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // Append images only if selected
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/product/add`, 
        formData, 
        { headers: { Authorization: `Bearer ${aToken}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset Form
        setName('');
        setDescription('');
        setPrice('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSize = (size) => {
    setSizes(prev => 
      prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <title>Add Products</title>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
        
        <form onSubmit={onSubmitHandler} className="space-y-6">
          
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
            <div className="flex gap-4">
              {[image1, image2, image3, image4].map((img, index) => {
                const setImg = [setImage1, setImage2, setImage3, setImage4][index];
                return (
                  <label key={index} htmlFor={`image${index+1}`} className="cursor-pointer">
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors overflow-hidden relative">
                      {!img ? (
                        <FaCloudUploadAlt className="w-8 h-8 text-gray-400" />
                      ) : (
                        <img src={URL.createObjectURL(img)} alt="Preview" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <input 
                      type="file" 
                      id={`image${index+1}`} 
                      hidden 
                      onChange={(event) => setImg(event.target.files[0])} 
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(event) => setName(event.target.value)} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
              placeholder="Type here"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              required 
              value={description} 
              onChange={(event) => setDescription(event.target.value)} 
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
              placeholder="Write content here"
            />
          </div>

          {/* Category & Sub-Category & Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select 
                value={category} 
                onChange={(event) => setCategory(event.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sub Category</label>
              <select 
                value={subCategory} 
                onChange={(event) => setSubCategory(event.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Product Price</label>
              <input 
                type="number" 
                required 
                value={price} 
                onChange={(event) => setPrice(event.target.value)} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
                placeholder="25"
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Sizes</label>
            <div className="flex gap-3">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div 
                  key={size} 
                  onClick={() => toggleSize(size)}
                  className={`cursor-pointer px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                    sizes.includes(size) ? 'bg-fuchsia-100 border-fuchsia-500 text-fuchsia-700' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller Checkbox */}
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="bestseller" 
              checked={bestseller} 
              onChange={() => setBestseller(prev => !prev)}
              className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300 rounded"
            />
            <label htmlFor="bestseller" className="ml-2 block text-sm text-gray-900">
              Add to Bestseller
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProducts;