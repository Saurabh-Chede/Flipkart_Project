import { AiOutlineLogout } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";
import SidebarLink from "./common/SidebarLink";

export default function Sidebar() {
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
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex flex-col">
      {/* PROFILE HEADER */}
      <NavLink to="/myprofile/orders">
        <div className="flex items-center gap-4 border-b border-b-gray-300 py-4 px-4">
          <img src="/assets/download.svg" alt="myprofile" />
          <h2 className="text-gray-500 font-medium">MY ORDERS</h2>
        </div>
      </NavLink>

      {/* ACCOUNT SETTINGS */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 py-4 px-4">
          <img src="/assets/account-settings.svg" width={20} height={20} />
          <h2 className="text-gray-500 font-medium">ACCOUNT SETTINGS</h2>
        </div>

        <div className="border-b border-b-gray-300">
          <SidebarLink to="/myprofile" end>Profile Information</SidebarLink>
          <SidebarLink to="/myprofile/addresses">Manage Addresses</SidebarLink>
        </div>
      </div>

      {/* PAYMENTS */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 py-4 px-4">
          <img src="/assets/payments.svg" width={20} height={20} />
          <h2 className="text-gray-500 font-medium">PAYMENTS</h2>
        </div>

        <div className="border-b border-b-gray-300">
          <SidebarLink to="/myprofile/giftcards">Gift Cards</SidebarLink>

          <SidebarLink to="/myprofile/upi">Saved UPI</SidebarLink>
          <SidebarLink to="/myprofile/cards">Saved Cards</SidebarLink>
        </div>
      </div>

      {/* MY STUFF */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 py-4 px-4">
          <img src="/assets/mystuff.svg" width={20} height={20} />
          <h2 className="text-gray-500 font-medium">MY STUFF</h2>
        </div>

        <div className="border-b border-b-gray-300">
          <SidebarLink to="/myprofile/coupons">My Coupons</SidebarLink>

          <SidebarLink to="/myprofile/reviews">
            My Reviews & Ratings
          </SidebarLink>

          <SidebarLink to="/myprofile/notifications">
            All Notifications
          </SidebarLink>

          <SidebarLink to="/myprofile/wishlist">My Wishlist</SidebarLink>
        </div>
      </div>

      {/* LOGOUT */}
      <div
        onClick={handleLogout}
        className="flex items-center gap-4 py-4 px-4 cursor-pointer hover:bg-gray-100"
      >
        <AiOutlineLogout className="text-blue-600" />
        <h2 className="text-gray-500 font-medium">Logout</h2>
      </div>
    </div>
  );
}
