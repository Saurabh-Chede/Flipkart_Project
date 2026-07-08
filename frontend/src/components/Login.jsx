import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../config/axiosConfig";
import { login } from "../redux/authSlice";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        return console.log("All fields are required");
      }

      const response = await api.post("/auth/login", formData);

      if (response?.data?.success) {
        console.log(response.data.message);

        dispatch(login(response.data.user));
        toast.success('login successful')

        setFormData({
          email: "",
          password: "",
        });

        if (response.data.user.role === "seller") {
          navigate("/seller/dashboard");
        } else if (response.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black/50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-4xl md:h-[530px] flex flex-col md:flex-row rounded-sm overflow-hidden shadow-lg">
        {/* Left Section */}
        <div className="bg-[#2874f0] text-white md:w-[40%] p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Login</h2>

            <p className="mt-5 text-gray-200">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
        </div>

        {/* Right Section */}
        <form
          onSubmit={handleSubmit}
          className="md:w-[60%] p-8 flex flex-col h-full"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="border-b border-gray-300 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="border-b border-gray-300 py-3 outline-none mt-8 focus:border-blue-500"
          />

          <p className="text-xs text-gray-500 mt-8 leading-5">
            By continuing, you agree to Flipkart's Terms of Use and Privacy
            Policy.
          </p>

          <button
            type="submit"
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
        </form>
      </div>
    </div>
  );
}

export default Login;