import { useState } from "react";
import { Search } from "lucide-react";
import { Eye } from 'lucide-react';

export default function SellerOrders() {
  const [statusFilter, setStatusFilter] = useState("All");

 const orders = [
  {
    id: "#ORD1001",
    customer: "Rahul Sharma",
    product: "iPhone 15 Pro",
    amount: "₹1,29,999",
    status: "Pending",
    date: "17 Feb 2026",
  },
  {
    id: "#ORD1002",
    customer: "Sneha Patel",
    product: "Nike Air Max Shoes",
    amount: "₹5,999",
    status: "Shipped",
    date: "16 Feb 2026",
  },
  {
    id: "#ORD1003",
    customer: "Amit Verma",
    product: "Samsung 55” Smart TV",
    amount: "₹54,999",
    status: "Delivered",
    date: "15 Feb 2026",
  },
  {
    id: "#ORD1004",
    customer: "Priya Singh",
    product: "HP Pavilion Laptop",
    amount: "₹72,499",
    status: "Pending",
    date: "14 Feb 2026",
  },
  {
    id: "#ORD1005",
    customer: "Arjun Mehta",
    product: "Boat Rockerz Headphones",
    amount: "₹2,999",
    status: "Delivered",
    date: "13 Feb 2026",
  },
  {
    id: "#ORD1006",
    customer: "Neha Kapoor",
    product: "Apple Watch Series 9",
    amount: "₹39,900",
    status: "Shipped",
    date: "12 Feb 2026",
  },
  {
    id: "#ORD1007",
    customer: "Rohit Yadav",
    product: "Adidas Sports Jacket",
    amount: "₹4,499",
    status: "Delivered",
    date: "11 Feb 2026",
  },
  {
    id: "#ORD1008",
    customer: "Karan Malhotra",
    product: "OnePlus 12R",
    amount: "₹42,999",
    status: "Pending",
    date: "10 Feb 2026",
  },
  {
    id: "#ORD1009",
    customer: "Simran Kaur",
    product: "LG Double Door Refrigerator",
    amount: "₹33,990",
    status: "Shipped",
    date: "09 Feb 2026",
  },
  {
    id: "#ORD1010",
    customer: "Vikas Joshi",
    product: "Puma Running Shoes",
    amount: "₹6,499",
    status: "Delivered",
    date: "08 Feb 2026",
  },
];

const totalOrders = orders.length;
const pendingOrders = orders.filter(o => o.status === "Pending").length;
const shippedOrders = orders.filter(o => o.status === "Shipped").length;
const deliveredOrders = orders.filter(o => o.status === "Delivered").length;

const totalRevenue = orders.reduce((acc, order) => {
  return acc + Number(order.amount.replace(/[^0-9]/g, ""));
}, 0);

  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Order Management</h1>
        <p className="text-gray-500 text-sm">
          Manage and track customer orders
        </p>
      </div>

      {/* Stats Section */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-4">

  <div className="bg-white shadow rounded-lg p-4">
    <p className="text-sm text-gray-500">Total Orders</p>
    <h2 className="text-xl font-bold">{totalOrders}</h2>
  </div>

  <div className="bg-yellow-50 shadow rounded-lg p-4">
    <p className="text-sm text-yellow-600">Pending</p>
    <h2 className="text-xl font-bold text-yellow-700">
      {pendingOrders}
    </h2>
  </div>

  <div className="bg-blue-50 shadow rounded-lg p-4">
    <p className="text-sm text-blue-600">Shipped</p>
    <h2 className="text-xl font-bold text-blue-700">
      {shippedOrders}
    </h2>
  </div>

  <div className="bg-green-50 shadow rounded-lg p-4">
    <p className="text-sm text-green-600">Delivered</p>
    <h2 className="text-xl font-bold text-green-700">
      {deliveredOrders}
    </h2>
  </div>

  <div className="bg-purple-50 shadow rounded-lg p-4">
    <p className="text-sm text-purple-600">Total Revenue</p>
    <h2 className="text-xl font-bold text-purple-700">
      ₹{totalRevenue.toLocaleString()}
    </h2>
  </div>

</div>

      {/* Filters + Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4">

        {/* Status Filter */}
        <div className="flex gap-2 py-1">
          {["All", "Pending", "Shipped", "Delivered"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1 rounded-md text-sm ${
                statusFilter === status
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search order..."
            className="w-full pl-9 pr-3 py-1 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-x-scroll">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-b-gray-300 hover:bg-gray-50">
                <td className="p-3 font-medium">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.product}</td>
                <td className="p-3">{order.amount}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:underline flex items-center text-sm">
                    <Eye color="red" size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}