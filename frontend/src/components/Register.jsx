import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Register Data:", formData);

    setFormData({
      name: "",
      email: "",
      password: "",
    });

    navigate('/login')
  };

 return (
  <div className="min-h-screen bg-black/50 flex justify-center items-center px-4">
    <div className="bg-white w-full max-w-4xl h-132.5 flex flex-col md:flex-row rounded-sm overflow-hidden shadow-lg">
      
      {/* Left Section */}
      <div className="bg-[#2874f0] text-white md:w-[40%] p-10 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-semibold">
            Looks like you're new here!
          </h2>

          <p className="mt-5 text-gray-200">
            Sign up with your details to get started.
          </p>
        </div>

        <img
          src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c6a81e.png"
          alt="flipkart"
          className="w-64 mx-auto"
        />
      </div>

      {/* Right Section */}
      <form
        onSubmit={handleSubmit}
        className="md:w-[60%] p-8 flex flex-col h-full"
      >
        <input
          type="text"
          placeholder="Enter Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="border-b border-gray-300 py-3 outline-none focus:border-[#2874f0]"
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="border-b border-gray-300 py-3 outline-none mt-8 focus:border-[#2874f0]"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="border-b border-gray-300 py-3 outline-none mt-8 focus:border-[#2874f0]"
        />

        <p className="text-xs text-gray-500 mt-8 leading-5">
          By continuing, you agree to Flipkart's Terms of Use and Privacy
          Policy.
        </p>

        <button
          type="submit"
          className="bg-[#fb641b] hover:bg-[#f85606] text-white py-3 mt-8 font-medium shadow"
        >
          Register
        </button>

        <div className="mt-auto text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#2874f0] font-medium"
          >
            Existing User? Login
          </button>
        </div>
      </form>
    </div>
  </div>
);
}