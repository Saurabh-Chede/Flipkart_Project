import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/config/axiosConfig";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discountPercentage: "",
    stock: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !product.name ||
        !product.category ||
        !product.description ||
        !product.image ||
        !product.stock ||
        !product.price
      ) {
        return alert("all fields required");
      }

      const response = await api.post("/seller/add-product", product);

      if (response?.data?.success) {
        alert(response.data.message);

        setProduct({
          name: "",
          price: "",
          discountPercentage: "",
          stock: "",
          category: "",
          description: "",
          image: "",
        });

        navigate("/seller/viewproducts");
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white  p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Add New Product
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill the details to list your product
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Title
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter product title"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                name="discountPercentage"
                value={product.discountPercentage}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter stock"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="grocerry">Grocerry</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Paste image URL"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              placeholder="Write product description"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
