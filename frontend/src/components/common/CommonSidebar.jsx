import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { sidebarConfig } from "@/constants/sidebarConfig";

export default function Sidebar({ onClose }) {
  const user = useSelector((state) => state.auth.user);

  const role = user?.role || "user";
  const menuItems = sidebarConfig[role] || [];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 md:hidden">
      <aside className="w-72 h-full bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-[#2874F0] text-white">
          <h2 className="text-lg font-medium">Menu</h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-4 border-b border-gray-100 transition-colors ${
                      isActive
                        ? "bg-blue-50 text-[#2874F0] font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
