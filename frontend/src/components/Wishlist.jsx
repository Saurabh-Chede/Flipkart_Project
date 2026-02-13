// import { useState,useEffect } from "react";

// export default function Wishlist(){
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/cart.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setCart(data);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p className="p-4">Loading wishlist...</p>;
//   }

//   return (
//     <div className="bg-gray-100 py-3.5">
//       <div className="mx-4 md:mx-9 rounded-md flex-col max-w-7xl flex">
//         <h1 className="text-lg text-gray-700 mb-4">My wishlist (3 items)</h1>
//           <div className="w-full md:w-2/4 bg-white flex flex-col gap-3 rounded-md">
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex gap-5 py-6 px-4 border-b border-b-gray-300"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-24 h-24 object-contain"
//                   loading="lazy"
//                 />

//                 <div className="flex flex-1 flex-col lg:flex-row justify-between">
//                   <div className="flex flex-col">
//                     <h2 className="font-medium">{item.title}</h2>
//                   <p className="text-gray-600">₹{item.price}</p>
//                   </div>
//                  <div className="flex md:justify-end items-end ">
//                      <button className="bg-amber-600 text-white text-xs px-6 h-8 rounded-md">Add to Cart</button>
//                  </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//   );
// }

import { useState, useEffect } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/cart.json")
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data);
        setLoading(false);
      });
  }, []);

  const removeItem = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return <p className="p-6 text-gray-600">Loading wishlist...</p>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-gray-100">
        <h2 className="text-xl font-semibold mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-4">
          Looks like you haven't added anything yet.
        </p>
        <button className="bg-amber-600 text-white px-6 py-2 rounded-lg">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-6">
      <div className="mx-4 lg:mx-auto max-w-5xl flex justify-center flex-col">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          My Wishlist ({wishlist.length} items)
        </h1>

        <div className="bg-white grid lg:grid-cols-2 rounded-md shadow-sm">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-6 p-5 hover:bg-gray-50 transition border-b border-b-gray-300  "
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-contain"
                loading="lazy"
              />

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="font-medium text-gray-800">
                    {item.title}
                  </h2>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-lg font-semibold text-gray-900">
                      ₹{item.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{item.price + 2000}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      10% off
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-lg text-sm transition">
                    <FaShoppingCart />
                    Move to Cart
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 text-sm transition"
                  >
                    <FaTrash />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}