// import { FaChevronRight } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";

// export default function OrderPage() {
//   return (
//     <div className="bg-gray-200 min-h-screen py-4">
//       <div className="max-w-5xl mx-4 md:mx-auto bg-white shadow-sm">

//         {/* Breadcrumb */}
//         <div className="py-3 flex items-center px-4 gap-2 text-sm">
//           <p className="text-gray-400">My Account</p>
//           <FaChevronRight size={14} />
//           <p className="font-medium">My Orders</p>
//         </div>

//         {/* Order Card */}
//         <div className="flex flex-col gap-3 mt-3 mx-2 py-2">
//           <div className="border border-gray-200">

//           {/* Header */}
//           <div className="px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-300">
//             <p className="bg-blue-500 px-3 py-1 text-white text-xs sm:text-sm w-fit">
//               1263658349728OD7766769
//             </p>

//             <span className="flex items-center gap-1 border border-gray-300 px-3 py-1 text-sm w-fit cursor-pointer hover:bg-gray-100">
//               <FaLocationDot size={14} className="text-blue-500" />
//               Track
//             </span>
//           </div>

//           {/* Body */}
//           <div className="px-4 py-4 flex flex-col lg:flex-row gap-6">

//             {/* LEFT SIDE (Product Info) */}
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">

//               {/* Image */}
//               <img
//                 src="/assets/product_images/watch.jpg"
//                 alt="iphone"
//                 className="w-24 h-24 object-contain"
//               />

//               {/* Details */}
//               <div className="flex flex-col lg:flex-row lg:justify-between flex-1">
//                 <div>
//                   <p className="font-medium">
//                     Apple Iphone 7 (Black, 32GB)
//                   </p>
//                   <p className="text-sm text-gray-500">Color: Black</p>
//                   <p className="text-sm text-gray-500">
//                     Seller: SuperComNet
//                   </p>
//                 </div>

//                 <div className="">
//                   <p className="font-semibold">₹ 47,999</p>
//                   <p className="text-xs text-green-600">OFFERS: 1</p>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE (Delivery Info) */}
//             <div className="flex flex-col sm:flex-row justify-between lg:justify-between gap-4 lg:gap-10 flex-1">

//               <div>
//                 <p className="text-sm">
//                   Deliver expected by Sun, <br /> May 28th 17
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Your order has been placed.
//                 </p>
//               </div>

//               <button className="text-sm border border-gray-300 px-2 py-1 h-8 font-medium hover:underline w-fit">
//                 Cancel ✕
//               </button>

//             </div>
//           </div>
//         </div>
//         <div className="border border-gray-200">

//           {/* Header */}
//           <div className="px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-300">
//             <p className="bg-blue-500 px-3 py-1 text-white text-xs sm:text-sm w-fit">
//               1263658349728OD7766769
//             </p>

//             <span className="flex items-center gap-1 border border-gray-300 px-3 py-1 text-sm w-fit cursor-pointer hover:bg-gray-100">
//               <FaLocationDot size={14} className="text-blue-500" />
//               Track
//             </span>
//           </div>

//           {/* Body */}
//           <div className="px-4 py-4 flex flex-col lg:flex-row gap-6">

//             {/* LEFT SIDE (Product Info) */}
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">

//               {/* Image */}
//               <img
//                 src="/assets/product_images/watch.jpg"
//                 alt="iphone"
//                 className="w-24 h-24 object-contain"
//               />

//               {/* Details */}
//               <div className="flex flex-col lg:flex-row lg:justify-between flex-1">
//                 <div>
//                   <p className="font-medium">
//                     Apple Iphone 7 (Black, 32GB)
//                   </p>
//                   <p className="text-sm text-gray-500">Color: Black</p>
//                   <p className="text-sm text-gray-500">
//                     Seller: SuperComNet
//                   </p>
//                 </div>

//                 <div className="">
//                   <p className="font-semibold">₹ 47,999</p>
//                   <p className="text-xs text-green-600">OFFERS: 1</p>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE (Delivery Info) */}
//             <div className="flex flex-col sm:flex-row justify-between lg:justify-between gap-4 lg:gap-10 flex-1">

//               <div>
//                 <p className="text-sm">
//                   Deliver expected by Sun, <br /> May 28th 17
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Your order has been placed.
//                 </p>
//               </div>

//               <button className="text-sm border border-gray-300 px-2 py-1 h-8 font-medium hover:underline w-fit">
//                 Cancel ✕
//               </button>

//             </div>
//           </div>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { FaChevronRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function OrderPage() {

  const orders = [
    {
      id: "1263658349728OD7766769",
      title: "Apple Iphone 7 (Black, 32GB)",
      color: "Black",
      seller: "SuperComNet",
      price: 47999,
      image: "https://rukminim2.flixcart.com/image/312/312/j6mhxu80/mobile/7/n/z/apple-iphone-6-mq3e2hn-a-original-imaexfzbdzgctzrv.jpeg?q=70",
      deliveryDate: "Sun, May 28th 26",
      status: "Your order has been placed.",
      orderdate:'May 18th 26'
    },
    {
      id: "2234658349728OD9988776",
      title: "Samsung Galaxy S21 (Blue, 128GB)",
      color: "Blue",
      seller: "RetailNet",
      price: 52999,
      image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/h/c/2/galaxy-s21-fe-5g-sm-g990blg4ins-samsung-original-imah4yeuthzf92qg.jpeg?q=70",
      deliveryDate: "Mon, June 10th 25",
      status: "Your order has been shipped.",
      orderdate:'May 2nd 25'
    },
    {
    id: "7788658349728OD4455667",
    title: "OnePlus 11R (Silver, 256GB)",
    color: "Silver",
    seller: "TechBazaar",
    price: 39999,
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/6/u/3/11r-5g-cph2487-oneplus-original-imah77hkx4ykae5m.jpeg?q=70",
    deliveryDate: "Wed, June 14th 25",
    status: "Your order is out for delivery.",
    orderdate:'May 6th 25'
  },

  ];

  return (
    <div className="bg-gray-200 min-h-screen py-4">
      <div className="max-w-5xl mx-4 md:mx-auto bg-white shadow-sm">

        {/* Breadcrumb */}
        <div className="py-3 flex items-center px-4 gap-2 text-sm">
          <p className="text-gray-400">My Account</p>
          <FaChevronRight size={14} />
          <p className="font-medium">My Orders</p>
        </div>

        {/* Order Cards */}
        <div className="flex flex-col gap-3 mt-3 mx-2 py-2">

          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200">

              {/* Header */}
              <div className="px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-300">
                <p className="bg-blue-500 px-3 py-1 text-white text-xs sm:text-sm w-fit">
                  {order.id}
                </p>

                <span className="flex items-center gap-1 border border-gray-300 px-3 py-1 text-sm w-fit cursor-pointer hover:bg-gray-100">
                  <FaLocationDot size={14} className="text-blue-500" />
                  Track
                </span>
              </div>

              {/* Body */}
              <div className="px-4 py-4 flex flex-col lg:flex-row gap-6">

                {/* LEFT SIDE */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1">

                  <img
                    src={order.image}
                    alt={order.title}
                    className="w-24 h-24 object-contain"
                  />

                  <div className="flex flex-col lg:flex-row lg:justify-between flex-1">
                    <div>
                      <p className="font-medium">
                        {order.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Color: {order.color}
                      </p>
                      <p className="text-sm text-gray-500">
                        Seller: {order.seller}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">
                        ₹ {order.price}
                      </p>
                      <p className="text-xs text-green-600">
                        OFFERS: 1
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col sm:flex-row justify-between lg:justify-between gap-4 lg:gap-10 flex-1">

                  <div>
                    <p className="text-sm">
                      Deliver expected by Sun, <br />
                      {order.deliveryDate}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.status}
                    </p>
                  </div>

                  <button className="text-sm border border-gray-300 px-2 py-1 h-8 font-medium hover:underline w-fit">
                    Cancel ✕
                  </button>

                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-t border-t-gray-200 px-4 py-2">
                  <p className="text-sm text-gray-700">Ordered On : <b>{order.orderdate}</b> </p>
                  <p className="text-sm text-gray-700">Order Total <b>₹{order.price}</b></p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}