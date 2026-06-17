// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const SellerHomePage = () => {
//   const [chartType, setChartType] = useState("monthly");

//   const seller = {
//     name: "Saurabh Store",
//     totalOrders: 1245,
//     totalRevenue: 85400,
//     pendingOrders: 32,
//     lowStock: 5,
//   };

//   const chartData = {
//     today: [20, 35, 40, 25, 50],
//     weekly: [120, 150, 180, 140, 200, 170, 220],
//     monthly: [400, 600, 750, 500, 900, 850, 1000],
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 space-y-8">
//       {/* ===== Header ===== */}
//       <div className="flex flex-col justify-start md:justify-between md:flex-row gap-4 md:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             Welcome, {seller.name}
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Here is your business performance overview
//           </p>
//         </div>

//         <Link
//           to="/seller/addproduct"
//           className="bg-blue-600 text-white w-40 px-5 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
//         >
//           + Add Product
//         </Link>
//       </div>

//       {/* ===== Stats Cards ===== */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white rounded-xl shadow p-5">
//           <p className="text-gray-500 text-sm">Total Orders</p>
//           <h2 className="text-2xl font-bold mt-2">{seller.totalOrders}</h2>
//         </div>

//         <div className="bg-white rounded-xl shadow p-5">
//           <p className="text-gray-500 text-sm">Total Revenue</p>
//           <h2 className="text-2xl font-bold mt-2">₹{seller.totalRevenue}</h2>
//         </div>

//         <div className="bg-white rounded-xl shadow p-5">
//           <p className="text-gray-500 text-sm">Pending Orders</p>
//           <h2 className="text-2xl font-bold mt-2 text-yellow-600">
//             {seller.pendingOrders}
//           </h2>
//         </div>

//         <div className="bg-white rounded-xl shadow p-5">
//           <p className="text-gray-500 text-sm">Low Stock Items</p>
//           <h2 className="text-2xl font-bold mt-2 text-red-600">
//             {seller.lowStock}
//           </h2>
//         </div>
//       </div>

//       {/* ===== Sales Chart ===== */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-gray-700">
//             Sales Overview
//           </h2>

//           <select
//             value={chartType}
//             onChange={(e) => setChartType(e.target.value)}
//             className="border border-gray-300 px-3 py-2 rounded-sm text-sm outline-none"
//           >
//             <option value="today">Today</option>
//             <option value="weekly">Last 7 Days</option>
//             <option value="monthly">Last 12 Months</option>
//           </select>
//         </div>

//         <div className="mt-8 flex items-end gap-4 h-64">
//           {chartData[chartType].map((value, index) => (
//             <div
//               key={index}
//               className="flex-1 bg-blue-500 rounded-sm hover:bg-blue-600 transition"
//               style={{ height: `${value / 10}%`}}
//             ></div>
//           ))}
//         </div>
//       </div>

//       {/* ===== Recent Orders ===== */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-700 mb-4">
//           Recent Orders
//         </h2>

//         <div className="space-y-3">
//           <div className="flex justify-between items-center p-3 border border-gray-300 rounded-md">
//             <div>
//               <p className="font-medium">Order #10234</p>
//               <p className="text-sm text-gray-500">iPhone 14 Pro</p>
//             </div>
//             <span className="text-green-600 text-sm">Delivered</span>
//           </div>

//           <div className="flex justify-between items-center p-3 border border-gray-300 rounded-md">
//             <div>
//               <p className="font-medium">Order #10235</p>
//               <p className="text-sm text-gray-500">Samsung TV</p>
//             </div>
//             <span className="text-yellow-600 text-sm">Processing</span>
//           </div>

//           <div className="flex justify-between items-center p-3 border border-gray-300 rounded-md">
//             <div>
//               <p className="font-medium">Order #10236</p>
//               <p className="text-sm text-gray-500">Nike Shoes</p>
//             </div>
//             <span className="text-red-600 text-sm">Cancelled</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerHomePage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SellerHomePage = () => {
  const [chartType, setChartType] = useState("monthly");

  const seller = {
    name: "Saurabh Store",
    totalOrders: 1245,
    totalRevenue: 85400,
    pendingOrders: 32,
    lowStock: 5,
  };

  const chartData = {
    today: [20, 35, 40, 25, 50],
    weekly: [120, 150, 180, 140, 200, 170, 220],
    monthly: [400, 600, 750, 500, 900, 850, 1000],
  };

  const orders = [
    {
      id: "#10234",
      product: "iPhone 14 Pro",
      status: "Delivered",
    },
    {
      id: "#10235",
      product: "Samsung TV",
      status: "Processing",
    },
    {
      id: "#10236",
      product: "Nike Shoes",
      status: "Cancelled",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {seller.name}
          </h1>
          <p className="text-muted-foreground">
            Here is your business performance overview
          </p>
        </div>

        <Link to="/seller/addproduct">
          <Button>Add Product</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">
              {seller.totalOrders}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">
              ₹{seller.totalRevenue.toLocaleString()}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold text-yellow-600">
              {seller.pendingOrders}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold text-red-600">
              {seller.lowStock}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Sales Overview</CardTitle>

          <Select
            value={chartType}
            onValueChange={(value) => setChartType(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="weekly">Last 7 Days</SelectItem>
              <SelectItem value="monthly">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          <div className="flex items-end gap-4 h-72">
            {chartData[chartType].map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-primary rounded-md transition-all hover:opacity-80"
                style={{
                  height: `${value / 10}%`,
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center border rounded-lg p-4"
            >
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.product}
                </p>
              </div>

              <Badge
                variant={
                  order.status === "Delivered"
                    ? "default"
                    : order.status === "Processing"
                    ? "secondary"
                    : "destructive"
                }
              >
                {order.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerHomePage;
