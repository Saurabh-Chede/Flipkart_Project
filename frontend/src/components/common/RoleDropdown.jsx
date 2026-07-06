import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../config/axiosConfig"

export default function RoleDropdown() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      dispatch(logout());

      toast.success("Logged out");

      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DropdownMenu>
      {/* TRIGGER */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex rounded-none gap-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none">
          {user?.name || "Account"}
        </Button>
      </DropdownMenuTrigger>

      {/* CONTENT */}
      <DropdownMenuContent align="end" className="w-56 rounded-none">
        {/* USER SECTION */}
        {user?.role === "user" && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/myprofile">My Profile</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/orders">My Orders</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/wishlist">Wishlist</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/seller-request">BecomeSeller</Link>
            </DropdownMenuItem>
          </>
        )}

        {/* SELLER SECTION */}
        {user?.role === "seller" && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/seller/dashboard">Dashboard</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/seller/profile">profile</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/seller/addproduct">Add Product</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/seller/viewproducts">My Products</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/seller/orders">Orders</Link>
            </DropdownMenuItem>
          </>
        )}

        {/* ADMIN SECTION */}
        {user?.role === "admin" && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="admin/userspage">Manage Users</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="admin/allproductspage">Manage Products</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="admin/orders">All Orders</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="admin/singlesellerpage">SingleSeller</Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        {/* COMMON ACTIONS */}
        {user ? (
          <DropdownMenuItem onClick={handleLogout} className="text-red-500">
            Logout
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link to="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/register">Register</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
