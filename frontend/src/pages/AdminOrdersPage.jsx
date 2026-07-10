import { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";
import api from "@/config/axiosConfig";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/admin/orders");

        setOrders(res.data.orders);
        setSummary(res.data.summary);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "SHIPPED":
        return "bg-blue-100 text-blue-700";

      case "PACKED":
        return "bg-indigo-100 text-indigo-700";

      case "CONFIRMED":
        return "bg-cyan-100 text-cyan-700";

      case "PLACED":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Orders</p>

          <h3 className="text-3xl font-bold">
            {summary.totalOrders}
          </h3>
        </div>

        <div className="bg-green-50 p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Delivered Orders
          </p>

          <h3 className="text-3xl font-bold text-green-600">
            {summary.deliveredOrders}
          </h3>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Pending Orders
          </p>

          <h3 className="text-3xl font-bold text-yellow-600">
            {summary.pendingOrders}
          </h3>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Total Revenue
          </p>

          <h3 className="text-3xl font-bold text-blue-600 flex items-center gap-1">
            <IndianRupee size={20} />
            {summary.totalRevenue.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto scrollbar-hide">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-center">Products</th>
              <th className="p-4 text-center">Amount</th>
              <th className="p-4 text-center">Payment</th>
              <th className="p-4 text-center">Payment Status</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {order.orderNumber}
                  </td>

                  <td className="p-4">
                    {order.customer}
                  </td>

                  <td className="p-4 text-center">
                    {order.products}
                  </td>

                  <td className="p-4 text-center font-semibold">
                    ₹ {order.amount.toLocaleString()}
                  </td>

                  <td className="p-4 text-center">
                    {order.paymentMethod}
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}