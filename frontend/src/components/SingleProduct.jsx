import React from "react";

const SingleProduct = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Image Section */}
        <div className="lg:w-1/3 bg-white p-5 rounded-xl shadow-sm">
          <img
            src="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70"
            alt="product"
            className="w-full h-64 object-contain rounded-lg"
          />

          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Change Image
          </button>
        </div>

        {/* Form Section */}
        <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-sm space-y-5">
          
          <div>
            <label className="block text-sm font-medium">
              Product Name
            </label>
            <input
              type="text"
              defaultValue="iPhone 14"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Price
              </label>
              <input
                type="number"
                defaultValue="79999"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Stock
              </label>
              <input
                type="number"
                defaultValue="12"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Description
            </label>
            <textarea
              rows="4"
              defaultValue="Latest iPhone model with advanced features."
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
              Save Changes
            </button>

            <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
              Delete Product
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleProduct;