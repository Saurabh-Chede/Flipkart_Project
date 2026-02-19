import './App.css'
import CategoryPage from './components/CategoryPage'
import HomePage from './components/HomePage'
import Cart from './components/Cart'
import ProductPage from './components/ProductPage'
import Wishlist from './components/Wishlist'
import OrderPage from './components/OrderPage'
import { Routes, Route } from "react-router-dom";
import PaymentPage from './components/PaymentPage'
import ProfilePage from './components/ProfilePage'
import Layout from './components/Layout'
import SellerHomePage from './components/SellerPage'
import ViewProducts from './components/ViewProducts'
import SingleProduct from './components/SingleProduct'
import AddProductPage from './components/AddProductPage'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/myprofile" element={<ProfilePage />} />
        <Route path="/seller" element={<SellerHomePage />} />
        <Route path="/seller/addproduct" element={<AddProductPage />} />
        <Route path="/viewproducts" element={<ViewProducts />} />
        <Route path="/editproduct" element={<SingleProduct />} />
      </Route>
    </Routes>
  )
}

export default App
