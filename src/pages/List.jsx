import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ token }) => {

  const [products, setProducts] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl+'/api/product/list');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Fetch failed:', error);
      toast.error('Failed to fetch product list');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await axios.post(backendUrl+
        '/api/product/remove',
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Product List</h2>
      <ul className="space-y-6">
        {products.map((product) => (
          <li
            key={product._id}
            className="flex items-center justify-between bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-6">
              {product.image && product.image.length > 0 ? (
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400">
                  No Image
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  {product.category} / {product.subCategory}
                </p>
                <p className="mt-1 text-indigo-600 font-semibold text-lg">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(product._id)}
              className="px-5 py-2 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
