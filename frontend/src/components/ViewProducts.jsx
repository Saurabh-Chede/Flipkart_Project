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
      <h1 className="text-xl text-gray-600 font-bold mb-6">My Products</h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sellerProduct.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-44 object-contain rounded-lg"
            />

            <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>

            <p className="text-green-600 font-bold mt-1">₹{product.price}</p>

            <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>

            <div className="flex justify-between mt-4">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm">
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {sellerProduct.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products found</p>
      )}
    </div>
  );
};

export default ViewProducts;
