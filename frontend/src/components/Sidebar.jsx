import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";

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
      <div className="flex items-center gap-4 border-b border-b-gray-300 py-4 px-4">
        <img src="/assets/download.svg" alt="myprofile" />
        <h2 className="text-gray-500 font-medium">MY PROFILE</h2>
      </div>

      {/* ACCOUNT SETTINGS */}
      <div className="flex flex-col gap-2">

        <div className="flex items-center gap-4 py-4 px-4">
          <img src="/assets/account-settings.svg" width={20} height={20} />
          <h2 className="text-gray-500 font-medium">ACCOUNT SETTINGS</h2>
        </div>

        <div className="border-b border-b-gray-300">

          <Link to="/account">
            <div className="px-12 py-3 hover:bg-gray-200 bg-blue-50 text-blue-600 text-sm">
              Profile Information
            </div>
          </Link>

          <Link to="/account/addresses">
            <div className="px-12 py-3 hover:bg-gray-200 text-sm">
              Manage Addresses
            </div>
          </Link>

          <Link to="/account/pancard">
            <div className="px-12 py-3 hover:bg-gray-200 text-sm">
              PAN Card Information
            </div>
          </Link>

        </div>
      </div>

      {/* PAYMENTS */}
      <div className="flex flex-col gap-2">

        <div className="flex items-center gap-4 py-4 px-4">
          <img src="/assets/payments.svg" width={20} height={20} />
          <h2 className="text-gray-500 font-medium">PAYMENTS</h2>
        </div>

        <div className="border-b border-b-gray-300">

          <Link to="/account/giftcards">
            <div className="px-12 py-3 hover:bg-gray-200 text-sm">
              Gift Cards
            </div>
          </Link>

          <Link to="/account/upi">
            <div className="px-12 py-3 hover:bg-gray-200 text-sm">
              Saved UPI
            </div>
          </Link>

          <Link to="/account/cards">
            <div className="px-12 py-3 hover:bg-gray-200 text-sm">
              Saved Cards
            </div>
          </Link>

        </div>
      </div>

      {/* MY STUFF */}
      <div className="flex flex-col gap-2">

        <div className="flex items-center gap-4 py-4 px-4">
          <img src="/assets/mystuff.svg" width={20} height={20} />
          <h2 className="text-gray-500 font-medium">MY STUFF</h2>
        </div>

        <div className="border-b border-b-gray-300">

          <Link to="/account/coupons">
            <div className="px-12 py-3 hover:bg-gray-200 text-sm">
              My Coupons
            </div>
          </Link>

          <Link to="/account/reviews">
            <div className="px-12 py-3 hover:bg-gray-200 text-sm">
              My Reviews & Ratings
            </div>
          </Link>

          <Link to="/account/notifications">
            <div className="px-12 py-3 hover:bg-gray-200 text-sm">
              All Notifications
            </div>
          </Link>

          <Link to="/wishlist">
            <div className="px-12 py-3 hover:bg-gray-200 text-sm">
              My Wishlist
            </div>
          </Link>

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