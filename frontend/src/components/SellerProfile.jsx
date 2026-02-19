import { useState } from "react";
import {
  Store,
  Landmark,
  Shield,
  Key,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  CreditCard,
  Hash
} from "lucide-react";

export default function SellerProfile() {
  const [activeTab, setActiveTab] = useState("store");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">Profile Settings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your store details and account settings
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200">
          {[
            { id: "store", label: "Store" },
            { id: "bank", label: "Bank" },
            { id: "security", label: "Security" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transition-all duration-300"></span>
              )}
            </button>
          ))}
        </div>

        {/* Animated Content */}
        <div className="relative">
          <div
            key={activeTab}
            className="animate-fadeSlide"
          >

            {/* STORE TAB */}
            {activeTab === "store" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-8 space-y-6">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Store size={18} /> Business Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  <Input icon={<Store size={16} />} value="RetailStore India Pvt Ltd" />
                  <Input icon={<User size={16} />} value="RetailStore India" />
                  <Input icon={<Mail size={16} />} value="business@retailstoreindia.com" />
                  <Input icon={<Phone size={16} />} value="+91 98765 43210" />
                  <Input icon={<Globe size={16} />} value="www.retailstoreindia.com" />
                  <Input icon={<Hash size={16} />} value="29AABCU9603R1ZM" readOnly />
                  <Input icon={<MapPin size={16} />} value="42, MG Road, Bengaluru" />

                </div>

                <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm">
                  Save Changes
                </button>
              </div>
            )}

            {/* BANK TAB */}
            {activeTab === "bank" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-8 space-y-6">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Landmark size={18} /> Bank Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <InfoCard icon={<User size={16} />} label="Account Holder" value="RetailStore India Pvt Ltd" />
                  <InfoCard icon={<Landmark size={16} />} label="Bank Name" value="HDFC Bank" />
                  <InfoCard icon={<CreditCard size={16} />} label="Account Number" value="XXXX XXXX XXXX 4829" />
                  <InfoCard icon={<Hash size={16} />} label="IFSC Code" value="HDFC0001234" />
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <div className="space-y-8">

                <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-8 space-y-6">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <Shield size={18} /> Account Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input icon={<User size={16} />} value="Rajesh Sharma" />
                    <Input icon={<Mail size={16} />} value="rajesh@retailstoreindia.com" />
                    <Input icon={<Phone size={16} />} value="+91 98765 43210" />
                    <Input icon={<Shield size={16} />} value="Admin" readOnly />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-8 space-y-6">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <Key size={18} /> Change Password
                  </h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    <PasswordInput placeholder="Current Password" />
                    <PasswordInput placeholder="New Password" />
                    <PasswordInput placeholder="Confirm Password" />
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm">
                    Update Password
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

      {/* Animation CSS */}
      <style>
        {`
          .animate-fadeSlide {
            animation: fadeSlide 0.3s ease;
          }
          @keyframes fadeSlide {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

/* Reusable Components */

function Input({ icon, value, readOnly }) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
      <span className="text-gray-400 mr-2">{icon}</span>
      <input
        defaultValue={value}
        readOnly={readOnly}
        className="w-full outline-none text-sm bg-transparent"
      />
    </div>
  );
}

function PasswordInput({ placeholder }) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
      <Key size={16} className="text-gray-400 mr-2" />
      <input
        type="password"
        placeholder={placeholder}
        className="w-full outline-none text-sm"
      />
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        {icon}
        {label}
      </div>
      <p className="font-medium text-gray-800 mt-1">{value}</p>
    </div>
  );
}