import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuestUserRoute() {
  const user = useSelector((state) => state.auth.user);

  // Admin should not see customer pages
  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  // Seller should not see customer pages
  if (user?.role === "seller") {
    return <Navigate to="/seller/dashboard" />;
  }

  // Normal user or not logged in
  return <Outlet />;
}
