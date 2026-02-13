import { AiOutlineLogout } from "react-icons/ai";
export default function Sidebar() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 border-b border-b-gray-300 py-4 px-4">
        <img src="/assets/download.svg" alt="myprofile" />
        <h2 className="text-gray-500 font-medium">MY PROFILE</h2>
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-4 py-4 px-4">
          <img
            src="/assets/account-settings.svg"
            width={20}
            height={20}
            alt="account-settings"
          />
          <h2 className="text-gray-500 font-medium">ACCOUNT SETTINGS</h2>
        </div>
      </div>
      <div className="profile-options hidden md:block border-b border-b-gray-300">
            <a href="/account">
                <div className="px-12 py-3 hover:bg-gray-200 bg-blue-50 text-blue-600 text-sm">Profile Information</div>
            </a>
            <a href="/account/addresses">
                <div className="px-12 py-3 hover:bg-gray-200 text-sm">Manage Addresses</div>
            </a>
            <a href="/account/pancard">
                <div className="px-12 py-3 hover:bg-gray-200 text-sm">PAN Card Information</div>
            </a>
        </div>
        <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-4 py-4 px-4">
          <img
            src="/assets/payments.svg"
            width={20}
            height={20}
            alt="account-settings"
          />
          <h2 className="text-gray-500 font-medium">PAYMENTS</h2>
        </div>
      </div>
      <div className="profile-options hidden md:block border-b border-b-gray-300">
            <a href="/account">
                <div className="px-12 py-3 hover:bg-gray-200 text-sm">Gift Cards</div>
            </a>
            <a href="/account/addresses">
                <div className="px-12 py-3 hover:bg-gray-200 text-sm">Saved Upi</div>
            </a>
            <a href="/account/pancard">
                <div className="px-12 py-3 hover:bg-gray-200 text-sm">Saved Cards</div>
            </a>
        </div>
        <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-4 py-4 px-4">
          <img
            src="/assets/mystuff.svg"
            width={20}
            height={20}
            alt="account-settings"
          />
          <h2 className="text-gray-500 font-medium">MY STUFF</h2>
        </div>
      </div>
      <div className="profile-options hidden md:block border-b border-b-gray-300">
            <a href="/account">
                <div className="px-12 py-3 hover:bg-gray-200 text-sm">My Coupons</div>
            </a>
            <a href="/account/addresses">
                <div className="px-12 py-3 hover:bg-gray-200 text-sm">My Reviews & Ratings</div>
            </a>
            <a href="/account/pancard">
                <div className="px-12 py-3 hover:bg-gray-200 text-sm">All Notifications</div>
            </a>
            <a href="/account/pancard">
                <div className="px-12 py-3 hover:bg-gray-200 text-sm">My Wishlist</div>
            </a>
        </div>
        <div className="flex items-center gap-4 py-4 px-4">
          <AiOutlineLogout fill="blue" />
          <h2 className="text-gray-500 font-medium">Logout</h2>
        </div>

    </div>
  );
}
