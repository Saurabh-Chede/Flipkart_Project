import { useState } from "react";
import { Package, ShoppingBag, IndianRupee, Star } from "lucide-react";

export default function SingleSellerPage() {
  const [activeTab, setActiveTab] = useState("products");

  const seller = {
    name: "Tech World Pvt Ltd",
    email: "techworld@gmail.com",
    joined: "12 Jan 2023",
    rating: 4.5,
    totalRevenue: 1250000,
    totalOrders: 320,
    totalProducts: 48,
  };

  const products = [
    { id: 1, name: "iPhone 14", price: 79999, stock: 12 },
    { id: 2, name: "Samsung Galaxy S23", price: 69999, stock: 8 },
    { id: 3, name: "OnePlus 11", price: 56999, stock: 15 },
    { id: 4, name: "Mi 4K Smart TV", price: 34999, stock: 6 },
    { id: 5, name: "Sony Headphones", price: 9999, stock: 20 },
    { id: 6, name: "Boat Smartwatch", price: 2999, stock: 25 },
    { id: 7, name: "Dell Laptop i5", price: 58999, stock: 5 },
    { id: 8, name: "HP Printer", price: 12999, stock: 10 },
    { id: 9, name: "Logitech Mouse", price: 799, stock: 50 },
    { id: 10, name: "Mechanical Keyboard", price: 3499, stock: 18 },
  ];

  const orders = [
    { id: 101, customer: "Rahul Sharma", total: 79999, status: "Delivered" },
    { id: 102, customer: "Aman Verma", total: 69999, status: "Pending" },
    { id: 103, customer: "Priya Singh", total: 34999, status: "Shipped" },
    { id: 104, customer: "Neha Patel", total: 9999, status: "Cancelled" },
    { id: 105, customer: "Vikram Rao", total: 58999, status: "Delivered" },
    { id: 106, customer: "Karan Mehta", total: 12999, status: "Shipped" },
    { id: 107, customer: "Sneha Joshi", total: 2999, status: "Pending" },
    { id: 108, customer: "Rohit Das", total: 799, status: "Delivered" },
    { id: 109, customer: "Anjali Gupta", total: 3499, status: "Delivered" },
    { id: 110, customer: "Sahil Khan", total: 56999, status: "Processing" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Shipped":
        return "bg-blue-100 text-blue-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      case "Processing":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* Seller Header */}
      <div className="bg-white rounded-xl shadow p-5 md:p-6 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{seller.name}</h2>
        <p className="text-gray-500 text-sm md:text-base">{seller.email}</p>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Joined on {seller.joined}
        </p>

        <div className="flex items-center gap-2 mt-3 text-yellow-500">
          <Star size={18} fill="currentColor" />
          <span className="font-semibold text-sm md:text-base">
            {seller.rating}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="bg-white p-4 md:p-5 rounded-xl shadow flex items-center gap-4">
          <IndianRupee className="text-blue-600" />
          <div>
            <p className="text-gray-500 text-xs md:text-sm">Total Revenue</p>
            <p className="text-lg md:text-xl font-bold">
              ₹{seller.totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow flex items-center gap-4">
          <ShoppingBag className="text-green-600" />
          <div>
            <p className="text-gray-500 text-xs md:text-sm">Total Orders</p>
            <p className="text-lg md:text-xl font-bold">
              {seller.totalOrders}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow flex items-center gap-4">
          <Package className="text-purple-600" />
          <div>
            <p className="text-gray-500 text-xs md:text-sm">Total Products</p>
            <p className="text-lg md:text-xl font-bold">
              {seller.totalProducts}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-xl shadow">
        <div className="flex border-b border-gray-200 px-4 md:px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("products")}
            className={`py-3 md:py-4 mr-6 font-medium whitespace-nowrap ${
              activeTab === "products"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Products
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 md:py-4 font-medium whitespace-nowrap ${
              activeTab === "orders"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Orders
          </button>
        </div>

        <div className="p-4 md:p-6">

          {/* Products Table */}
          {activeTab === "products" && (
            <div className="w-full overflow-x-auto">
              <table className="min-w-150 w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id} className="border-b border-b-gray-300">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">₹{item.price}</td>
                      <td className="p-3">{item.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Orders Table */}
          {activeTab === "orders" && (
            <div className="w-full overflow-x-auto">
              <table className="min-w-175 w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-b-gray-300">
                      <td className="p-3">#{order.id}</td>
                      <td className="p-3">{order.customer}</td>
                      <td className="p-3">₹{order.total}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}