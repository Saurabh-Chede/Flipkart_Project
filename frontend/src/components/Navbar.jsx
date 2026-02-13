import Logo from "../assets/Logo.svg";
import Search from "../assets/Search.svg";
import profile from "../assets/profile.svg";
import Menu from "../assets/menu_btn.svg";
import Cart from "../assets/header_cart.svg";
import Store from "../assets/Store.svg";
import threeDots from "../assets/header_3verticalDots.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm md:py-1.5 sticky top-0 z-50">
      <nav className="flex items-center justify-between md:gap-4 h-14 px-4 lg:px-16">
        {/* LEFT */}
        <div className="flex items-center gap-3 lg:basis-3/5">
          {/* Mobile menu */}
          <img src={Menu} alt="menu" className="w-6 h-6 md:hidden" />

          {/* Logo */}
          <Link to="/">
            <img
              src={Logo}
              alt="logo"
              className="h-8 md:h-10 -ml-8 cursor-pointer"
            />
          </Link>

          {/* Search (desktop only) */}
          <div className="hidden lg:flex flex-1 max-w-150 ml-6">
            <div className="flex items-center w-full bg-slate-100 px-3 rounded-md">
              <img src={Search} alt="search" className="w-6" />
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full px-3 py-2 bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 lg:basis-2/5 md:justify-between">
          {/* Login */}
          <a href="/login" className="flex items-center gap-1">
            <img src={profile} alt="profile" />
            <span>Login</span>
          </a>

          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-1">
            <img src={Cart} alt="cart" />
            <span className="hidden md:block">Cart</span>
          </Link>

          {/* Seller */}
          <a href="/store" className="flex items-center gap-1">
            <img src={Store} alt="store" />
            <span className="hidden md:block">Become a Seller</span>
          </a>

          {/* More */}
          <img src={threeDots} alt="more" className="hidden md:block" />
        </div>
      </nav>
    </header>
  );
}
