// import { useState } from "react";
// import {
//   FaGooglePay,
//   FaCreditCard,
//   FaUniversity,
//   FaMoneyBillWave,
//   FaLock,
// } from "react-icons/fa";

// export default function PaymentPage() {
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const orderAmount = 54999;

//   const paymentMethods = [
//     { id: "upi", label: "UPI", icon: <FaGooglePay size={20} /> },
//     { id: "card", label: "Credit / Debit Card", icon: <FaCreditCard size={20} /> },
//     { id: "netbanking", label: "Net Banking", icon: <FaUniversity size={20} /> },
//     { id: "cod", label: "Cash on Delivery", icon: <FaMoneyBillWave size={20} /> },
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen p-4 md:p-8">
//       <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">

//         {/* LEFT SECTION */}
//         <div className="flex-1 md:order-1 order-2 bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-6">
//             Select Payment Method
//           </h2>

//           {paymentMethods.map((method) => (
//             <div
//               key={method.id}
//               className={`border rounded-xl overflow-hidden mb-4 transition-all duration-300 ${
//                 selectedMethod === method.id
//                   ? "border-amber-500 shadow-md"
//                   : "border-gray-200"
//               }`}
//             >
//               <button
//                 onClick={() => setSelectedMethod(method.id)}
//                 className="w-full flex items-center gap-3 p-4 font-medium"
//               >
//                 <span className="text-amber-600">{method.icon}</span>
//                 {method.label}
//               </button>

//               {selectedMethod === method.id && (
//                 <div className="p-4 bg-gray-50">
                  
//                   {/* UPI */}
//                   {method.id === "upi" && (
//                     <input
//                       type="text"
//                       placeholder="Enter UPI ID"
//                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
//                     />
//                   )}

//                   {/* CARD */}
//                   {method.id === "card" && (
//                     <div className="space-y-3">
//                       <input
//                         type="text"
//                         placeholder="Card Number"
//                         className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
//                       />
//                       <div className="flex gap-3">
//                         <input
//                           type="text"
//                           placeholder="MM/YY"
//                           className="w-1/2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
//                         />
//                         <input
//                           type="text"
//                           placeholder="CVV"
//                           className="w-1/2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* NET BANKING */}
//                   {method.id === "netbanking" && (
//                     <select className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none">
//                       <option>Select Bank</option>
//                       <option>SBI</option>
//                       <option>HDFC</option>
//                       <option>ICICI</option>
//                     </select>
//                   )}

//                   {/* COD */}
//                   {method.id === "cod" && (
//                     <p className="text-sm text-gray-600">
//                       Pay in cash when your order is delivered.
//                     </p>
//                   )}

//                 </div>
//               )}
//             </div>
//           ))}

//           {/* MAIN PAY BUTTON */}
//           <button className="mt-8 bg-amber-500 hover:bg-amber-600 transition-all text-white w-full py-4 rounded-xl text-lg font-semibold shadow-md">
//             Pay ₹{orderAmount}
//           </button>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="w-full md:order-2 order-1 lg:w-80">
//           <div className="bg-white p-6 rounded-xl shadow-sm sticky top-20">
//             <h2 className="font-semibold text-lg mb-4 border-b pb-3">
//               Order Summary
//             </h2>

//             <div className="flex justify-between text-sm mb-2">
//               <span>Price</span>
//               <span>₹59999</span>
//             </div>

//             <div className="flex justify-between text-sm mb-2 text-green-600">
//               <span>Discount</span>
//               <span>- ₹5000</span>
//             </div>

//             <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg">
//               <span>Total</span>
//               <span>₹{orderAmount}</span>
//             </div>

//             <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
//               <FaLock />
//               100% Secure Payment
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "@/config/axiosConfig";

// import {
//   FaGooglePay,
//   FaCreditCard,
//   FaUniversity,
//   FaMoneyBillWave,
//   FaLock,
// } from "react-icons/fa";

// export default function PaymentPage() {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [order, setOrder] = useState(null);
//   const [pageLoading, setPageLoading] = useState(true);

//   useEffect(() => {
//     fetchOrder();
//   }, [orderId]);

//   const fetchOrder = async () => {
//     try {
//       setPageLoading(true);

//       const res = await api.get(`/order/${orderId}`);

//       if (res.data.success) {
//         setOrder(res.data.order);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load order");
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   const paymentMethods = [
//     {
//       id: "UPI",
//       label: "UPI",
//       icon: <FaGooglePay size={20} />,
//     },
//     {
//       id: "CARD",
//       label: "Credit / Debit Card",
//       icon: <FaCreditCard size={20} />,
//     },
//     {
//       id: "NET_BANKING",
//       label: "Net Banking",
//       icon: <FaUniversity size={20} />,
//     },
//     {
//       id: "COD",
//       label: "Cash on Delivery",
//       icon: <FaMoneyBillWave size={20} />,
//     },
//   ];

//   const handlePayment = async () => {
//     if (!selectedMethod) {
//       alert("Please select a payment method");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await api.patch(`/order/payment/${orderId}`, {
//         paymentMethod: selectedMethod,
//         paymentStatus:
//           selectedMethod === "COD" ? "PENDING" : "PAID",
//       });

//       if (res.data.success) {
//         navigate(`/order-success/${orderId}`);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(
//         error?.response?.data?.message || "Payment failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (pageLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-lg font-medium">Loading Order...</p>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500 font-medium">
//           Order not found
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f1f3f6] p-4 md:p-6">
//       <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
//         {/* LEFT */}
//         <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-6">
//             Select Payment Method
//           </h2>

//           {paymentMethods.map((method) => (
//             <div
//               key={method.id}
//               className={`border rounded-lg mb-4 transition-all ${
//                 selectedMethod === method.id
//                   ? "border-blue-500 shadow"
//                   : "border-gray-200"
//               }`}
//             >
//               <button
//                 onClick={() => setSelectedMethod(method.id)}
//                 className="w-full flex items-center gap-3 p-4 text-left"
//               >
//                 <span className="text-blue-600">
//                   {method.icon}
//                 </span>

//                 <span className="font-medium">
//                   {method.label}
//                 </span>
//               </button>

//               {selectedMethod === method.id && (
//                 <div className="px-4 pb-4 text-sm text-gray-600">
//                   {method.id === "UPI" &&
//                     "Pay instantly using any UPI app."}

//                   {method.id === "CARD" &&
//                     "Secure card payment (Demo)."}

//                   {method.id === "NET_BANKING" &&
//                     "Choose your preferred bank."}

//                   {method.id === "COD" &&
//                     "Pay when your order is delivered."}
//                 </div>
//               )}
//             </div>
//           ))}

//           <button
//             onClick={handlePayment}
//             disabled={loading}
//             className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-md font-semibold text-lg disabled:opacity-50"
//           >
//             {loading
//               ? "Processing..."
//               : selectedMethod === "COD"
//               ? "Place Order"
//               : `Pay ₹${order?.pricing?.grandTotal || 0}`}
//           </button>
//         </div>

//         {/* RIGHT */}
//         <div className="w-full lg:w-96">
//           <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
//             <h2 className="font-semibold text-lg border-b pb-3 mb-4">
//               Order Summary
//             </h2>

//             {/* Products */}
//             <div className="space-y-4 max-h-80 overflow-y-auto">
//               {order?.items?.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex gap-3 border-b pb-3"
//                 >
//                   <img
//                     src={
//                       item.image ||
//                       item.product?.image ||
//                       "https://via.placeholder.com/80"
//                     }
//                     alt={item.title}
//                     className="w-16 h-16 object-cover rounded border"
//                   />

//                   <div className="flex-1">
//                     <h3 className="text-sm font-medium line-clamp-2">
//                       {item.title}
//                     </h3>

//                     <p className="text-xs text-gray-500 mt-1">
//                       Qty: {item.quantity}
//                     </p>

//                     <p className="font-semibold mt-1">
//                       ₹{item.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Price Details */}
//             <div className="mt-5 border-t pt-4">
//               <h3 className="font-medium text-gray-700 mb-3">
//                 PRICE DETAILS
//               </h3>

//               <div className="flex justify-between text-sm mb-2">
//                 <span>Price</span>
//                 <span>
//                   ₹{order?.pricing?.itemsTotal || 0}
//                 </span>
//               </div>

//               <div className="flex justify-between text-sm mb-2">
//                 <span>Delivery Charges</span>
//                 <span>
//                   ₹{order?.pricing?.deliveryCharge || 0}
//                 </span>
//               </div>

//               <div className="flex justify-between text-sm mb-2 text-green-600">
//                 <span>Discount</span>
//                 <span>
//                   - ₹{order?.pricing?.discount || 0}
//                 </span>
//               </div>

//               <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg">
//                 <span>Total Amount</span>
//                 <span>
//                   ₹{order?.pricing?.grandTotal || 0}
//                 </span>
//               </div>
//             </div>

//             {/* Shipping Address */}
//             <div className="mt-5 border-t pt-4">
//               <h3 className="font-medium mb-2">
//                 Deliver To
//               </h3>

//               <p className="text-sm font-medium">
//                 {order?.shippingAddress?.fullName}
//               </p>

//               <p className="text-sm text-gray-600 mt-1">
//                 {order?.shippingAddress?.addressLine}
//               </p>

//               <p className="text-sm text-gray-600">
//                 {order?.shippingAddress?.city},{" "}
//                 {order?.shippingAddress?.state} -{" "}
//                 {order?.shippingAddress?.pincode}
//               </p>

//               <p className="text-sm text-gray-600 mt-1">
//                 Phone: {order?.shippingAddress?.phone}
//               </p>
//             </div>

//             <div className="flex items-center gap-2 text-xs text-gray-500 mt-5">
//               <FaLock />
//               100% Secure Payment
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/config/axiosConfig";

import {
  FaGooglePay,
  FaCreditCard,
  FaUniversity,
  FaMoneyBillWave,
  FaLock,
} from "react-icons/fa";

export default function PaymentPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setPageLoading(true);

      const res = await api.get(`/order/${orderId}`);

      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load order");
    } finally {
      setPageLoading(false);
    }
  };

  const paymentMethods = [
    { id: "UPI", label: "UPI", icon: <FaGooglePay size={20} /> },
    { id: "CARD", label: "Credit / Debit Card", icon: <FaCreditCard size={20} /> },
    { id: "NET_BANKING", label: "Net Banking", icon: <FaUniversity size={20} /> },
    { id: "COD", label: "Cash on Delivery", icon: <FaMoneyBillWave size={20} /> },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return alert("Please select a payment method");

    try {
      setLoading(true);

      const res = await api.patch(`/order/payment/${orderId}`, {
        paymentMethod: selectedMethod,
        paymentStatus: selectedMethod === "COD" ? "PENDING" : "PAID",
      });

      if (res.data.success) {
        navigate(`/order-success/${orderId}`);
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading Order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] p-4 md:p-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* LEFT */}
        <div className="flex-1 bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-6">
            Select Payment Method
          </h2>

          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border rounded-lg mb-4 ${
                selectedMethod === method.id
                  ? "border-blue-500"
                  : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setSelectedMethod(method.id)}
                className="w-full flex items-center gap-3 p-4"
              >
                <span className="text-blue-600">{method.icon}</span>
                <span>{method.label}</span>
              </button>
            </div>
          ))}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded"
          >
            {loading
              ? "Processing..."
              : selectedMethod === "COD"
              ? "Place Order"
              : `Pay ₹${order?.pricing?.grandTotal || 0}`}
          </button>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-96">
          <div className="bg-white p-6 rounded-lg sticky top-20">
            <h2 className="font-semibold mb-4">Order Summary</h2>

            {/* PRODUCTS */}
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {order?.items?.map((item) => (
                <div key={item._id} className="flex gap-3 border-b pb-3">
                  <img
                    src={
                      item.image ||
                      item.product?.image ||
                      "https://via.placeholder.com/80"
                    }
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-sm font-medium">
                      {item.title}
                    </h3>

                    {/* PRICE + DISCOUNT */}
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">
                        ₹{item.price}
                      </span>

                      {(item.discountPercentage || 0) > 0 && (
                        <>
                          <span className="text-xs text-gray-500 line-through">
                            ₹{item.originalPrice}
                          </span>

                          <span className="text-xs text-green-600">
                            {item.discountPercentage}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-sm font-medium mt-1">
                      Total: ₹
                      {item.totalPrice ||
                        item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* PRICE DETAILS */}
            <div className="mt-5 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Price</span>
                <span>₹{order?.pricing?.itemsTotal || 0}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Delivery </span>
                <span>₹{order?.pricing?.deliveryCharge || 0}</span>
              </div>

              {/* <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>- ₹{order?.pricing?.discount || 0}</span>
              </div> */}

              <div className="flex justify-between font-semibold text-lg mt-3 border-t pt-3">
                <span>Total</span>
                <span>₹{order?.pricing?.grandTotal || 0}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs mt-4 text-gray-500">
              <FaLock />
              100% Secure Payment
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}