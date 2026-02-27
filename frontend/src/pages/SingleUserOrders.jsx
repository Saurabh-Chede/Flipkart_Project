import { useMemo } from "react";
import { Package, IndianRupee } from "lucide-react";

const ordersData = [
  { id: "ORD1001", product: "Men's Casual T-Shirt", price: 799, quantity: 2, date: "02 Feb 2026", status: "Delivered", payment: "UPI" },
  { id: "ORD1002", product: "Wireless Headphones", price: 2499, quantity: 1, date: "05 Feb 2026", status: "Shipped", payment: "Credit Card" },
  { id: "ORD1003", product: "Smart Watch", price: 3999, quantity: 1, date: "09 Feb 2026", status: "Processing", payment: "COD" },
  { id: "ORD1004", product: "Bluetooth Speaker", price: 1599, quantity: 3, date: "11 Feb 2026", status: "Delivered", payment: "UPI" },
  { id: "ORD1005", product: "Laptop Stand", price: 899, quantity: 1, date: "14 Feb 2026", status: "Cancelled", payment: "Debit Card" },
  { id: "ORD1006", product: "Gaming Mouse", price: 1299, quantity: 2, date: "18 Feb 2026", status: "Delivered", payment: "Credit Card" },
  { id: "ORD1007", product: "LED Monitor", price: 8999, quantity: 1, date: "21 Feb 2026", status: "Shipped", payment: "UPI" },
  { id: "ORD1008", product: "Phone Case", price: 499, quantity: 4, date: "23 Feb 2026", status: "Processing", payment: "COD" },
  { id: "ORD1009", product: "Bluetooth Earbuds", price: 1999, quantity: 1, date: "25 Feb 2026", status: "Delivered", payment: "UPI" },
  { id: "ORD1010", product: "Office Chair", price: 7499, quantity: 1, date: "27 Feb 2026", status: "Shipped", payment: "Debit Card" },
  ];

export default function SingleUserOrders() {
  const totalSpent = useMemo(() => {
    return ordersData
      .filter((order) => order.status !== "Cancelled")
      .reduce((total, order) => total + order.price * order.quantity, 0);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Shipped":
        return "bg-blue-100 text-blue-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">User Orders</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* Total Orders */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm mb-2">Total Orders</p>
          <h3 className="text-3xl font-bold text-gray-800">
            {ordersData.length}
          </h3>
        </div>

        {/* Delivered Orders */}
        <div className="bg-green-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm mb-2">Delivered Orders</p>
          <h3 className="text-3xl font-bold text-green-600">
            {
              ordersData.filter(order => order.status === "Delivered").length
            }
          </h3>
        </div>

        {/* Total Revenue */}
        <div className="bg-blue-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
          <p className="text-gray-500 text-sm mb-2">Total Revenue</p>
          <h3 className="text-3xl font-bold text-blue-600 flex items-center gap-1">
            <IndianRupee size={20} />
            {totalSpent}
          </h3>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Total</th>
              <th className="p-4 text-center">Payment</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {ordersData.map((order) => (
              <tr key={order.id} className="border-t border-t-gray-300 hover:bg-gray-50">
                <td className="p-4 font-medium">{order.id}</td>

                <td className="p-4 flex items-center gap-2">
                  <Package size={14} />
                  {order.product}
                </td>

                <td className="p-4">₹ {order.price}</td>

                <td className="p-4">{order.quantity}</td>

                <td className="p-4 font-semibold">
                  ₹ {order.price * order.quantity}
                </td>

                {/* ✅ Payment clearly separate */}
                <td className="p-4 text-center">
                  {order.payment}
                </td>

                {/* ✅ Date clearly separate */}
                <td className="p-4 text-center">
                  {order.date}
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}