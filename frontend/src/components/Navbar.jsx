// import Logo from "../assets/Logo.svg";
// import Search from "../assets/Search.svg";
// import profile from "../assets/profile.svg";
// import Menu from "../assets/menu_btn.svg";
// import Cart from "../assets/header_cart.svg";
// import Store from "../assets/Store.svg";
// import threeDots from "../assets/header_3verticalDots.svg";

// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import RoleDropdown from "@/components/common/RoleDropdown";

// export default function Navbar() {
//   const user = useSelector((state) => state.auth.user);

//   return (
//     <header className="bg-white shadow-sm md:py-1.5 sticky top-0 z-50">
//       <nav className="flex items-center justify-between md:gap-4 h-14 px-4 lg:px-16">

//         {/* LEFT SIDE */}
//         <div className="flex items-center gap-3 lg:basis-3/5">
//           <img src={Menu} alt="menu" className="w-6 h-6 md:hidden" />

//           <Link to="/">
//             <img
//               src={Logo}
//               alt="logo"
//               className="h-8 md:h-10 -ml-8 cursor-pointer"
//             />
//           </Link>

//           {/* SEARCH */}
//           <div className="hidden lg:flex flex-1 max-w-150 ml-6">
//             <div className="flex items-center w-full bg-slate-100 px-3 rounded-md">
//               <img src={Search} alt="search" className="w-6" />
//               <input
//                 type="text"
//                 placeholder="Search for products, brands and more"
//                 className="w-full px-3 py-2 bg-transparent outline-none"
//               />
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-4 lg:basis-2/5 md:justify-between">

//           {/* ROLE DROPDOWN (IMPORTANT) */}
//           <RoleDropdown />

//           {/* CART (ONLY USER) */}
//           {user?.role === "user" && (
//             <Link to="/viewcart" className="flex items-center gap-1">
//               <img src={Cart} alt="cart" />
//               <span className="hidden md:block">Cart</span>
//             </Link>
//           )}

//           {/* SELLER DASHBOARD */}
//           {user?.role === "seller" && (
//             <Link to="/seller/dashboard" className="flex items-center gap-1">
//               <img src={Store} alt="store" />
//               <span className="hidden md:block">Seller Dashboard</span>
//             </Link>
//           )}

//           {/* ADMIN PANEL */}
//           {user?.role === "admin" && (
//             <Link to="/adminlayout" className="flex items-center gap-1">
//               <img src={Store} alt="admin" />
//               <span className="hidden md:block">Admin Panel</span>
//             </Link>
//           )}

//           {/* MORE */}
//           <img src={threeDots} alt="more" className="hidden md:block" />

//         </div>
//       </nav>
//     </header>
//   );
// }

import Logo from "../assets/Logo.svg";
import CartIcon from "../assets/header_cart.svg";
import Store from "../assets/Store.svg";
import Menu from "../assets/menu_btn.svg";
import threeDots from "../assets/header_3verticalDots.svg";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import RoleDropdown from "@/components/common/RoleDropdown";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const totalQuantity = useSelector((state) =>
    (state.cart.items || []).reduce(
      (sum, item) => sum + (item.quantity || 0),
      0,
    ),
  );

  return (
    <header className="bg-white shadow-sm md:py-1.5 sticky top-0 z-50">
      <nav className="flex items-center justify-between h-14 px-4 lg:px-16">
        {/* LEFT */}
        <div className="flex items-center gap-3 lg:basis-3/5">
          <img src={Menu} alt="menu" className="w-6 h-6 md:hidden" />

          <Link to="/">
            <img src={Logo} alt="logo" className="h-8 md:h-10" />
          </Link>

          {/* SEARCH */}
          <div className="hidden lg:flex flex-1 max-w-150 ml-6">
            <div className="flex items-center w-full bg-slate-100 px-3 rounded-md">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-3 py-2 bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          <RoleDropdown />

          {/* CART WITH BADGE */}
          {user?.role === "user" && (
            <Link to="/viewcart" className="relative flex items-center gap-1">
              <img src={CartIcon} alt="cart" />

              <span className="hidden md:block">Cart</span>

              {/* 🔥 BADGE */}
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>
          )}

          {/* SELLER */}
          {user?.role === "seller" && (
            <Link to="/seller/dashboard" className="flex items-center gap-1">
              <img src={Store} alt="store" />
              <span className="hidden md:block">Dashboard</span>
            </Link>
          )}

          {/* ADMIN */}
          {user?.role === "admin" && (
            <Link to="/adminlayout" className="flex items-center gap-1">
              <img src={Store} alt="admin" />
              <span className="hidden md:block">Admin</span>
            </Link>
          )}

          <img src={threeDots} alt="more" className="hidden md:block" />
        </div>
      </nav>
    </header>
  );
}
