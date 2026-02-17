import React from "react";

const ViewProducts = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 14",
      price: "79,999",
      stock: 12,
      image: "/assets/product_images/tv2.jpg",
    },
    {
      id: 2,
      name: "TV Board",
      price: "15,999",
      stock: 5,
      image: "/assets/product_images/tv1.jpg",
    },
    {
      id: 3,
      name: "Canon Camera",
      price: "45,000",
      stock: 8,
      image: "/assets/product_images/canon.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">My Products</h1>

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full lg:w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          + Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-44 object-contain rounded-lg"
            />

            <h3 className="mt-3 font-semibold text-lg">
              {product.name}
            </h3>

            <p className="text-green-600 font-bold mt-1">
              ₹{product.price}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Stock: {product.stock}
            </p>

            <div className="flex justify-between mt-4">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600">
                Edit
              </button>

              <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;