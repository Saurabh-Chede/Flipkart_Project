import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Users, Box, Store, ShoppingCart, AlertCircle } from "lucide-react";

export default function DashboardHome() {
  const stats = [
    { label: "Total Users", value: 1240, icon: <Users size={20} />, color: "bg-blue-100 text-blue-600" },
    { label: "Total Products", value: 548, icon: <Box size={20} />, color: "bg-purple-100 text-purple-600" },
    { label: "Total Sellers", value: 72, icon: <Store size={20} />, color: "bg-green-100 text-green-600" },
    { label: "Orders Today", value: 130, icon: <ShoppingCart size={20} />, color: "bg-yellow-100 text-yellow-600" },
  ];

  const orderStatus = [
    { status: "Pending", count: 24, color: "bg-yellow-100 text-yellow-700" },
    { status: "Processing", count: 15, color: "bg-blue-100 text-blue-700" },
    { status: "Delivered", count: 89, color: "bg-green-100 text-green-700" },
    { status: "Cancelled", count: 2, color: "bg-red-100 text-red-700" },
  ];

  const topProducts = [
    { name: "Laptop", value: 40 },
    { name: "Headphones", value: 25 },
    { name: "Keyboard", value: 15 },
    { name: "Mouse", value: 10 },
    { name: "Monitor", value: 10 },
  ];
  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  const salesData = [
    { month: "Jan", sales: 120 },
    { month: "Feb", sales: 210 },
    { month: "Mar", sales: 180 },
    { month: "Apr", sales: 240 },
    { month: "May", sales: 200 },
    { month: "Jun", sales: 300 },
  ];

  const recentOrders = [
    { id: "ORD001", customer: "Saurabh", product: "Laptop", status: "Delivered", payment: "Paid" },
    { id: "ORD002", customer: "Rahul", product: "Headphones", status: "Processing", payment: "Pending" },
    { id: "ORD003", customer: "Anjali", product: "Keyboard", status: "Cancelled", payment: "Refunded" },
    { id: "ORD004", customer: "Priya", product: "Mouse", status: "Pending", payment: "Pending" },
  ];

  const lowStock = [
    { product: "Monitor", stock: 3 },
    { product: "Keyboard", stock: 5 },
    { product: "Mouse", stock: 2 },
  ];

  const topCategories = [
    { category: "Electronics", value: 150 },
    { category: "Fashion", value: 120 },
    { category: "Home Appliances", value: 90 },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4 flex items-center gap-4 border border-gray-200">
            <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="font-semibold text-lg text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Status */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {orderStatus.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg flex flex-col items-center justify-center ${item.color}`}>
              <p className="text-sm font-medium">{item.status}</p>
              <p className="text-xl font-bold mt-2">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Products Pie Chart */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>
          <div className="w-full h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topProducts}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Trend */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Sales Trend</h2>
          <div className="w-full h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Order ID", "Customer", "Product", "Status", "Payment"].map((head) => (
                <th key={head} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 whitespace-nowrap">{order.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.customer}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.product}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.status}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <AlertCircle size={20} /> Low Stock Alerts
        </h2>
        <ul className="list-disc list-inside">
          {lowStock.map((item, idx) => (
            <li key={idx} className="text-sm text-red-600 font-medium">
              {item.product} – Only {item.stock} left in stock!
            </li>
          ))}
        </ul>
      </div>

      {/* Top Categories */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Categories</h2>
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