// constants/sidebarConfig.js

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Heart,
  User,
  Settings,
} from "lucide-react";

export const sidebarConfig = {
  user: [
    {
      title: "My Profile",
      path: "/myprofile",
      icon: User,
    },
    {
      title: "Orders",
      path: "/orders",
      icon: ShoppingCart,
    },
    {
      title: "Wishlist",
      path: "/wishlist",
      icon: Heart,
    },
  ],

  seller: [
    {
      title: "Dashboard",
      path: "/seller/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      path: "/seller/products",
      icon: Package,
    },
    {
      title: "Orders",
      path: "/seller/orders",
      icon: ShoppingCart,
    },
  ],

  admin: [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      path: "/admin/userspage",
      icon: Users,
    },
    {
      title: "Products",
      path: "/admin/allproductspage",
      icon: Package,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: "Request",
      path: "/admin/requests",
      icon: Settings,
    },
  ],
};