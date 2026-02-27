import { useState } from "react";
import {
  Home,
  Store,
  Box,
  ShoppingCart,
  BarChart2,
  Settings,
  User,
} from "lucide-react";

import DashboardHome from "./DashboardHomePage";
import SellersPage from "./SellersTable";
import UsersPage from "./UsersPage";

export default function AdminLayout() {
  const [activePage, setActivePage] = useState("home");

  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "sellers", label: "Sellers", icon: <Store size={18} /> },
    { id: "users", label: "Users", icon: <User size={18} /> },
    { id: "products", label: "Products", icon: <Box size={18} /> },
    { id: "orders", label: "Orders", icon: <ShoppingCart size={18} /> },
    { id: "categories", label: "Categories", icon: <BarChart2 size={18} /> },
    { id: "reports", label: "Reports", icon: <BarChart2 size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <DashboardHome />;
      case "sellers":
        return <SellersPage />;
      case "users":
        return <UsersPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-full">

      {/* ================= STICKY SIDEBAR ================= */}
      <aside className="hidden md:block w-64 bg-white border-r border-r-gray-300">
        <div className="sticky top-0 h-[calc(100vh-64px)] flex flex-col">
          {/* 64px approx navbar height — adjust if needed */}

          <div className="p-6 text-2xl font-bold border-b border-b-gray-300">
            Admin Panel
          </div>

          <nav className="p-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg w-full text-left transition ${
                  activePage === item.id
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* ================= SCROLLABLE MAIN CONTENT ================= */}
      <main className="flex-1 p-6 overflow-y-auto">
        {renderPage()}
      </main>

    </div>
  );
}