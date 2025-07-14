import React, { useState } from 'react';
import axios from 'axios';
import assets from '../assets/admin_assets/assets';
import { toast } from 'react-toastify';


const backendUrl = import.meta.env.VITE_BACKEND_URL

const AddProduct = ({ token }) => {
    // Individual useState for each field
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [sizes, setSizes] = useState('');
    const [bestseller, setBestseller] = useState(false);

    const [images, setImages] = useState([null, null, null, null]);
    const [previews, setPreviews] = useState([null, null, null, null]);

    // Handlers for input changes
    const handleInputChange = (setter) => (e) => {
        const { type, checked, value } = e.target;
        setter(type === 'checkbox' ? checked : value);
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const updatedImages = [...images];
            updatedImages[index] = file;
            setImages(updatedImages);

            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedPreviews = [...previews];
                updatedPreviews[index] = reader.result;
                setPreviews(updatedPreviews);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
     e.preventDefault();
     const payload = new FormData();

  // Ensure price and bestseller are strings, sizes sent as stringified JSON
  payload.append('name', name);
  payload.append('description', description);
  payload.append('price', price.toString());
  payload.append('category', category);
  payload.append('subCategory', subCategory);
  payload.append('sizes', sizes); // user inputs sizes as JSON string like '["S","M","L"]'
  payload.append('bestseller', bestseller.toString());

  images.forEach((file, idx) => {
    if (file) {
      payload.append(`image${idx + 1}`, file);
    }
  });

  try {
    const response = await axios.post(backendUrl + '/api/product/add', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: token,
      },
    });
   toast.success("Product added successfully!");
  } catch (error) {
    console.error('Upload failed:', error);
    alert(error.response?.data?.message || 'Upload failed');
  }
};


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md space-y-6"
        >
            <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>

            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={handleInputChange(setName)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={handleInputChange(setDescription)}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                </label>
                <input
                    type="number"
                    value={price}
                    onChange={handleInputChange(setPrice)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                </label>
                <input
                    type="text"
                    value={category}
                    onChange={handleInputChange(setCategory)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Subcategory */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategory
                </label>
                <input
                    type="text"
                    value={subCategory}
                    onChange={handleInputChange(setSubCategory)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Sizes */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sizes (e.g. ["S","M","L"])
                </label>
                <input
                    type="text"
                    value={sizes}
                    onChange={handleInputChange(setSizes)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Bestseller Checkbox */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={bestseller}
                    onChange={handleInputChange(setBestseller)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    id="bestseller"
                />
                <label htmlFor="bestseller" className="ml-2 text-sm text-gray-700">
                    Bestseller
                </label>
            </div>

            {/* Image Upload */}
            <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Upload Images</p>
                <div className="flex gap-3 flex-wrap">
                    {[0, 1, 2, 3].map((i) => (
                        <label
                            key={i}
                            htmlFor={`image${i + 1}`}
                            className="relative cursor-pointer group"
                        >
                            <img
                                src={previews[i] || assets.upload_area}
                                alt={`Image ${i + 1}`}
                                className="w-24 h-24 object-cover border rounded-md shadow-sm group-hover:opacity-80 transition"
                            />
                            <input
                                type="file"
                                id={`image${i + 1}`}
                                hidden
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, i)}
                            />
                        </label>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="w-full cursor-pointer py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition"
            >
                Add Product
            </button>
        </form>
    );
};

export default AddProduct;
