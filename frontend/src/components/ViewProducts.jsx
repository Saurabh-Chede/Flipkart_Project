import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";

const ViewProducts = () => {
  const [sellerProduct, setSellerProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    console.log("fetch");
    try {
      const response = await api.get("/seller/get-products");
      console.log(response.data);

      if (response.data.success) {
        setSellerProduct(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/seller/delete-product/${productId}`);

      toast.success(response.data.message);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-700">My Products</h1>

          <span className="text-sm text-gray-500">
            Total: {sellerProduct.length}
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sellerProduct.map((product) => (
            <div
              key={product._id}
              className="
              bg-white rounded-lg overflow-hidden
              shadow-sm hover:shadow-xl
              transition-all duration-300
              border border-gray-200
            "
            >
              {/* Image Section */}
              <div className="relative bg-gray-50 h-52 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="
                  h-full w-full object-contain
                  p-4
                "
                />

                {product.stock === 0 && (
                  <span
                    className="
                    absolute top-3 right-3
                    bg-red-500 text-white
                    text-xs px-3 py-1
                    rounded-full
                  "
                  >
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3
                  className="
                  font-semibold text-gray-800
                  truncate text-lg
                "
                >
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-blue-600 font-bold text-lg">
                    ₹{product.price}
                  </p>

                  <span
                    className="
                    text-xs bg-green-100
                    text-green-700
                    px-2 py-1 rounded-full
                  "
                  >
                    Stock: {product.stock}
                  </span>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() =>
                      navigate(`/seller/editproduct/${product._id}`)
                    }
                    className="
                    flex-1
                    bg-yellow-400
                    hover:bg-yellow-500
                    text-white
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                    transition
                  "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="
                    flex-1
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                    transition
                  "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sellerProduct.length === 0 && (
          <div
            className="
            bg-white rounded-lg
            shadow-sm
            p-10
            text-center
            text-gray-500
          "
          >
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProducts;
