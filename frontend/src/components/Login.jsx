import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);

    setFormData({
      email: "",
      password: "",
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black/50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-4xl h-132.5 flex flex-col md:flex-row rounded-sm overflow-hidden shadow-lg">
        {/* Left Section */}
        <div className="bg-[#2874f0] text-white md:w-[40%] p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Login</h2>

            <p className="mt-5 text-gray-200">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>

          <img
            src={Logo}
            alt="flipkart"
            className="w-30 bg-amber-300 py-2 mx-auto"
          />
        </div>

        {/* Right Section */}
        <div className="md:w-[60%] p-8 flex flex-col h-full">
          <input
            type="text"
            placeholder="Enter Email/Mobile Number"
            className="border-b border-gray-300 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="border-b border-gray-300 py-3 outline-none mt-8 focus:border-blue-500"
          />

          <p className="text-xs text-gray-500 mt-8 leading-5">
            By continuing, you agree to Flipkart's Terms of Use and Privacy
            Policy.
          </p>

          <button
            onClick={handleSubmit}
            className="bg-[#fb641b] hover:bg-[#f85606] text-white py-3 mt-8 font-medium shadow"
          >
            Login
          </button>

          <div className="mt-auto text-center">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-[#2874f0] font-medium cursor-pointer"
            >
              New to Flipkart? Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
