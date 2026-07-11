import { useEffect, useMemo, useState } from "react";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/config/axiosConfig";

export default function SellerOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/seller/orders");

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await api.patch(`/seller/orders/${orderId}/status`, {
        status,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      const matchesSearch =
        order.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.order
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, search]);

  const totalOrders = orders.length;

  const placedOrders = orders.filter(
    (o) => o.status === "PLACED"
  ).length;

  const shippedOrders = orders.filter(
    (o) => o.status === "SHIPPED"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "DELIVERED"
  ).length;

  const totalRevenue = orders
    .filter((o) => o.payoutStatus === "PAID")
    .reduce((acc, order) => acc + order.totalAmount, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-yellow-100 text-yellow-700";
      case "CONFIRMED":
        return "bg-indigo-100 text-indigo-700";
      case "PACKED":
        return "bg-purple-100 text-purple-700";
      case "SHIPPED":
        return "bg-blue-100 text-blue-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Order Management
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and track customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">
            Total Orders
          </p>
          <h2 className="text-xl font-bold">
            {totalOrders}
          </h2>
        </div>

        <div className="bg-yellow-50 shadow rounded-lg p-4">
          <p className="text-sm text-yellow-600">
            Placed
          </p>
          <h2 className="text-xl font-bold text-yellow-700">
            {placedOrders}
          </h2>
        </div>

        <div className="bg-blue-50 shadow rounded-lg p-4">
          <p className="text-sm text-blue-600">
            Shipped
          </p>
          <h2 className="text-xl font-bold text-blue-700">
            {shippedOrders}
          </h2>
        </div>

        <div className="bg-green-50 shadow rounded-lg p-4">
          <p className="text-sm text-green-600">
            Delivered
          </p>
          <h2 className="text-xl font-bold text-green-700">
            {deliveredOrders}
          </h2>
        </div>

        <div className="bg-purple-50 shadow rounded-lg p-4">
          <p className="text-sm text-purple-600">
            Revenue
          </p>
          <h2 className="text-xl font-bold text-purple-700">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          {[
            "All",
            "PLACED",
            "CONFIRMED",
            "PACKED",
            "SHIPPED",
            "DELIVERED",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                statusFilter === status
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search
            size={16}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search customer or order..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4 text-left">
                  Order ID
                </th>
                <th className="p-4 text-left">
                  Customer
                </th>
                <th className="p-4 text-left">
                  Items
                </th>
                <th className="p-4 text-left">
                  Amount
                </th>
                <th className="p-4 text-left">
                  Date
                </th>
                <th className="p-4 text-left">
                  Status
                </th>
                <th className="p-4 text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {String(order.order).slice(-8)}
                  </td>

                  <td className="p-4">
                    {order.user?.name}
                  </td>

                  <td className="p-4">
                    {order.items?.length || 0}
                  </td>

                  <td className="p-4 font-medium">
                    ₹
                    {order.totalAmount?.toLocaleString()}
                  </td>

                  <td className="p-4">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-IN")}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className="border rounded px-2 py-1 text-xs"
                      >
                        <option value="PLACED">
                          PLACED
                        </option>
                        <option value="CONFIRMED">
                          CONFIRMED
                        </option>
                        <option value="PACKED">
                          PACKED
                        </option>
                        <option value="SHIPPED">
                          SHIPPED
                        </option>
                        <option value="DELIVERED">
                          DELIVERED
                        </option>
                        <option value="CANCELLED">
                          CANCELLED
                        </option>
                      </select>
                    </div>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/seller/orders/${order._id}`
                        )
                      }
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <Eye
                        size={18}
                        className="text-blue-600"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}