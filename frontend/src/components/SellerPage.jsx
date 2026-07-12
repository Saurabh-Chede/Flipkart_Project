import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/config/axiosConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { StatsCardSkeleton } from "./common/StatsCardSkeleton";

import {
  Package,
  ShoppingCart,
  IndianRupee,
  AlertTriangle,
  Users,
  CheckCircle,
  XCircle,
  Plus,
  Boxes,
} from "lucide-react";

const SellerHomePage = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [statsRes, ordersRes, stockRes] = await Promise.all([
        api.get("/seller/dashboard/stats"),
        api.get("/seller/recent-orders"),
        api.get("/seller/low-stock"),
      ]);

      setStats(statsRes.data.stats);
      setRecentOrders(ordersRes.data.orders || []);
      setLowStockProducts(stockRes.data.products || []);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: <IndianRupee size={22} />,
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: <ShoppingCart size={22} />,
    },
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: <Package size={22} />,
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders || 0,
      icon: <AlertTriangle size={22} />,
    },
    {
      title: "Customers",
      value: stats?.totalCustomers || 0,
      icon: <Users size={22} />,
    },
    {
      title: "Delivered",
      value: stats?.deliveredOrders || 0,
      icon: <CheckCircle size={22} />,
    },
    {
      title: "Cancelled",
      value: stats?.cancelledOrders || 0,
      icon: <XCircle size={22} />,
    },
    {
      title: "Low Stock",
      value: stats?.outOfStockProducts || 0,
      icon: <Boxes size={22} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your store and track performance.
            </p>
          </div>

          <Link to="/seller/addproduct">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => <StatsCardSkeleton key={index} />)
            : cards.map((card, index) => (
                <Card key={index}>
                  <CardContent className="p-5 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {card.title}
                      </p>

                      <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-100">
                      {card.icon}
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* QUICK ACTIONS */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/seller/add-product">
              <Button className="w-full">Add Product</Button>
            </Link>

            <Link to="/seller/viewproducts">
              <Button variant="outline" className="w-full">
                Products
              </Button>
            </Link>

            <Link to="/seller/orders">
              <Button variant="outline" className="w-full">
                Orders
              </Button>
            </Link>

            <Link to="/seller/inventory">
              <Button variant="outline" className="w-full">
                Inventory
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* RECENT ORDERS */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>

          {/* <CardContent>
            {recentOrders.length === 0 ? (
              <p>No Orders Found</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="flex justify-between items-center border rounded-lg p-4"
                  >
                    <div>
                      <h3 className="font-semibold">
                        #{order.order || order._id}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {order.customer}
                      </p>
                    </div>

                    <div>
                      ₹{order.totalAmount?.toLocaleString()}
                    </div>

                    <div>
                      <span className="text-sm font-medium">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent> */}
          <CardContent>
            {recentOrders.length === 0 ? (
              <p>No Orders Found</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center border rounded-lg p-4"
                  >
                    <div>
                      <h3 className="font-semibold">#{order.id.slice(-6)}</h3>

                      <p className="text-sm text-muted-foreground">
                        {order.customer}
                      </p>

                      <p className="text-sm">{order.product}</p>
                    </div>

                    <div>
                      <Badge>{order.payment}</Badge>
                    </div>

                    <div>
                      <span className="text-sm font-medium">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* LOW STOCK */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Products</CardTitle>
          </CardHeader>

          <CardContent>
            {lowStockProducts.length === 0 ? (
              <p>All products are sufficiently stocked.</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex justify-between items-center border rounded-lg p-3"
                  >
                    <p className="font-medium">{product.name}</p>
                    <span className="text-red-600 font-semibold">
                      {product.stock} Left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerHomePage;
