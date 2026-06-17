import { useState, useEffect } from "react";
import api from "@/config/axiosConfig";

export default function SellerProfile() {
  const [profile, setProfile] = useState({
    shopName: "",
    gstNumber: "",
    panNumber: "",
    phone: "",
    businessEmail: "",
    address: "",
    bankDetails: {
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
    },
  });

  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/seller/profile");

      setProfile(res.data.sellerProfile);
      setProfileExists(true);
    } catch (error) {
      if (error.response?.status === 404) {
        setProfileExists(false);
      }

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleBankChange = (e) => {
    setProfile({
      ...profile,
      bankDetails: {
        ...profile.bankDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      if (profileExists) {
        await api.patch("/seller/profile", profile);
      } else {
        await api.post("/seller/profile", profile);
        setProfileExists(true);
      }

      alert("Profile saved successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to save profile");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white border rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold mb-6">
          Seller Profile
        </h2>

        <form onSubmit={saveProfile} className="space-y-4">
          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={profile.shopName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="gstNumber"
            placeholder="GST Number"
            value={profile.gstNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="panNumber"
            placeholder="PAN Number"
            value={profile.panNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="businessEmail"
            placeholder="Business Email"
            value={profile.businessEmail}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="address"
            placeholder="Business Address"
            value={profile.address}
            onChange={handleChange}
            rows={3}
            className="w-full border p-2 rounded"
          />

          <h3 className="text-lg font-semibold pt-4">
            Bank Details
          </h3>

          <input
            type="text"
            name="accountHolderName"
            placeholder="Account Holder Name"
            value={profile.bankDetails?.accountHolderName || ""}
            onChange={handleBankChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            value={profile.bankDetails?.accountNumber || ""}
            onChange={handleBankChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="ifscCode"
            placeholder="IFSC Code"
            value={profile.bankDetails?.ifscCode || ""}
            onChange={handleBankChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="bankName"
            placeholder="Bank Name"
            value={profile.bankDetails?.bankName || ""}
            onChange={handleBankChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {profileExists ? "Update Profile" : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}