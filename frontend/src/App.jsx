import "./App.css";
import CategoryPage from "./components/CategoryPage";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage";
import Wishlist from "./components/Wishlist";
import OrderPage from "./components/OrderPage";
import { Routes, Route } from "react-router-dom";
import PaymentPage from "./components/PaymentPage";
import ProfilePage from "./components/ProfilePage";
import Layout from "./components/Layout";
import SellerHomePage from "./components/SellerPage";
import ViewProducts from "./components/ViewProducts";
import SingleProduct from "./components/SingleProduct";
import AddProductPage from "./components/AddProductPage";
import SellerOrders from "./components/SellerOrders";
import SellerProfile from "./components/SellerProfile";
import SingleSellerPage from "./pages/SingleSellerPage";
import AdminLayout from "./pages/AdminLayout";
import UsersPage from "./pages/UsersPage";
import AllProductsPage from "./pages/AllProductsPage";
import SingleUserOrders from "./pages/SingleUserOrders";
import Login from "./components/Login";
import Register from "./components/Register";
import api from "./config/axiosConfig";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, logout, setLoading } from "./redux/authSlice";
import ProtectedRoute from "./routes/ProtectedRoute";
import BecomeSellerRequest from "./pages/user/BecomeSellerRequest";
import { fetchCart } from "./redux/cartSlice";
import MainProfile from "./components/MainProfile";
import Addresses from "./components/Addresses";
import CheckoutPage from "./components/CheckoutPage";
import OrderSuccess from "./pages/user/OrderSuccess";
import SellerOrderDetails from "./pages/seller/SellerOrderDetails";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await api.get("/auth/me");

        if (response.data.user) {
          dispatch(login(response.data.user));
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    getLoggedInUser();

    // 🔥 IMPORTANT FIX FOR CART BADGE
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:category" element={<CategoryPage />} />

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/viewcart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/seller-request" element={<BecomeSellerRequest />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />

          <Route path="/myprofile" element={<ProfilePage />}>
            <Route index element={<MainProfile />} />
            <Route path="profile" element={<MainProfile />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
          <Route path="/seller/dashboard" element={<SellerHomePage />} />
          <Route path="/seller/addproduct" element={<AddProductPage />} />
          <Route path="/seller/viewproducts" element={<ViewProducts />} />
          <Route path="/seller/editproduct" element={<SingleProduct />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/profile" element={<SellerProfile />} />
          <Route path="/seller/orders/:id" element={<SellerOrderDetails />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminLayout />} />
          <Route path="admin/userspage" element={<UsersPage />} />
          <Route path="admin/allproductspage" element={<AllProductsPage />} />
          <Route path="admin/singleuserorders" element={<SingleUserOrders />} />
          <Route path="admin/singlesellerpage" element={<SingleSellerPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
