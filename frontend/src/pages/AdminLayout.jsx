import { useState } from "react";
import {
  Home,
  Store,
  Box,
  ShoppingCart,
  BarChart2,
  Settings,
  X,
  User
} from "lucide-react";
import DashboardHome from "./DashboardHomePage";
import SellersPage from "./SellersTable";
import { FiSidebar } from "react-icons/fi";
import UsersPage from './UsersPage'

// Fallback page
const FallbackPage = (label) => (
  <div className="text-gray-500 text-center py-20">
    {label} Page Coming Soon
  </div>
);

export default function AdminLayout() {
  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "sellers", label: "Sellers", icon: <Store size={18} /> },
    { id:'users', label: "Users",icon: <User size={18} />},
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
      case "products":
        return <FallbackPage label="Products" />;
      case "orders":
        return <FallbackPage label="Orders" />;
      case "categories":
        return <FallbackPage label="Categories" />;
      case "reports":
        return <FallbackPage label="Reports" />;
      case "settings":
        return <FallbackPage label="Settings" />;
      case "users":
        return <UsersPage label="Users" />;

      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* ----------------- Desktop Sidebar ----------------- */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-screen">
        <div className="p-6 text-2xl font-bold text-gray-800 border-b border-gray-200">
          Admin Panel
        </div>
        <nav className="flex flex-col mt-6 gap-2 overflow-y-auto flex-1 px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-3 px-4 py-3 text-gray-700 text-sm font-medium transition rounded-r-lg w-full text-left ${
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

      {/* ----------------- Mobile Sidebar Overlay ----------------- */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity md:hidden ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* ----------------- Mobile Sidebar ----------------- */}
      <div
        className={`fixed md:hidden z-50 top-0 left-0 w-64 h-full bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-2xl font-bold text-gray-800 border-b border-gray-200 flex justify-between items-center">
          Admin Panel
          <button onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col mt-6 gap-2 overflow-y-auto flex-1 px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 text-gray-700 text-sm font-medium transition rounded-r-lg w-full text-left ${
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

      {/* ----------------- Main Content ----------------- */}
      <div className="flex-1 flex flex-col md:ml-64 overflow-auto min-h-screen">
        {/* Mobile Topbar */}
        <div className="md:hidden flex items-center bg-white p-4 border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="mr-4">
            <FiSidebar size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8 overflow-auto min-h-[calc(100vh-64px)]">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
