import { NavLink } from "react-router-dom";

export default function SidebarLink({ to, children ,end}) {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <div
          className={`px-12 py-3 hover:bg-gray-200 text-sm transition ${
            isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"
          }`}
        >
          {children}
        </div>
      )}
    </NavLink>
  );
}
