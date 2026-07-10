import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { Users, Store, ShoppingBag, Package, AlertCircle } from "lucide-react";

import { useState, useEffect } from "react";
import api from "@/config/axiosConfig";

export default function DashboardHome() {
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [topCategories,setTopCategories] = useState([])
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard-stats");

        setDashboardStats(res.data.stats);
        setOrderStatus(res.data.orderStatus);
        setTopProducts(res.data.topProducts);
        setSalesData(res.data.monthlySales);
        setRecentOrders(res.data.recentOrders);
        setLowStock(res.data.lowStock)
        setTopCategories(res.data.topCategories)
        
      } catch (err) {
        console.log("Dashboard stats error:", err.message);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      label: "Total Users",
      value: dashboardStats.totalUsers || 0,
      icon: <Users className="w-5 h-5 text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      label: "Total Sellers",
      value: dashboardStats.totalSellers || 0,
      icon: <Store className="w-5 h-5 text-green-600" />,
      color: "bg-green-100",
    },
    {
      label: "Total Products",
      value: dashboardStats.totalProducts || 0,
      icon: <Package className="w-5 h-5 text-orange-600" />,
      color: "bg-orange-100",
    },
    {
      label: "Total Orders",
      value: dashboardStats.totalOrders || 0,
      icon: <ShoppingBag className="w-5 h-5 text-purple-600" />,
      color: "bg-purple-100",
    },
  ];

  const statusColors = {
    Placed: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Packed: "bg-indigo-100 text-indigo-700",
    Shipped: "bg-cyan-100 text-cyan-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];


  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800">
        Dashboard Overview
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-4 flex items-center gap-4 border border-gray-200"
          >
            <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="font-semibold text-lg text-gray-800">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ORDER STATUS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {orderStatus.map((item) => (
          <div
            key={item.status}
            className={`p-4 rounded-lg flex flex-col items-center justify-center ${
              statusColors[item.status]
            }`}
          >
            <p className="text-sm font-medium">{item.status}</p>
            <p className="text-xl font-bold mt-2">{item.count}</p>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top Products
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProducts}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {topProducts.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Monthly Sales Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT ORDERS */}

      <div className="overflow-x-auto scrollbar-hide bg-white rounded-xl shadow border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Orders
        </h2>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Payment
              </th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  No recent orders
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => (
                <tr key={order._id} className="border-b last:border-b-0">
                  <td className="px-4 py-3">{order.orderNumber}</td>

                  <td className="px-4 py-3">{order.user?.name || "N/A"}</td>

                  <td className="px-4 py-3">
                    {order.items?.[0]?.title}
                    {order.items.length > 1 &&
                      ` +${order.items.length - 1} more`}
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* LOW STOCK */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-200">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <AlertCircle size={20} /> Low Stock Alerts
        </h2>

        <ul className="list-disc list-inside">
          {lowStock.length === 0 ? (
            <p className="text-gray-500">No low stock products</p>
          ) : (
            lowStock.map((item) => (
              <li key={item._id} className="text-sm text-red-600 font-medium">
                {item.name} – Only {item.stock} left
              </li>
            ))
          )}
        </ul>
      </div>

      {/* TOP CATEGORIES */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Top Categories</h2>

        <div className="flex flex-col gap-2">
          {topCategories.map((cat, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{cat.category}</span>
              <span className="font-semibold">{cat.value} Orders</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
