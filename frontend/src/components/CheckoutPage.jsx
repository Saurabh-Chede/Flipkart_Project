import { useState } from "react";

export default function CheckoutPage() {
  const [cartItems] = useState([
    {
      id: 1,
      title: "Samsung Smart TV",
      price: 29999,
      qty: 1,
      image: "/assets/product_images/tv1.jpg",
    },
    {
      id: 2,
      title: "Canon Camera",
      price: 79999,
      qty: 2,
      image: "/assets/product_images/canon.jpg",
    },
  ]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const discount = 5000;
  const finalAmount = total - discount;

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* LEFT SECTION */}
        <div className="flex-1 space-y-6">
          
          {/* Address Card */}
          <div className="bg-white p-5 rounded shadow-sm">
            <h2 className="font-semibold text-lg mb-3">Delivery Address</h2>
            <p className="text-sm text-gray-600">
              Saurabh Chede <br />
              123, MG Road, Pune <br />
              Maharashtra - 411001 <br />
              Phone: 9876543210
            </p>
            <button className="text-blue-600 text-sm mt-3">
              Change Address
            </button>
          </div>

          {/* Cart Items */}
          <div className="bg-white p-5 rounded shadow-sm space-y-5">
            <h2 className="font-semibold text-lg">Order Summary</h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b pb-4 last:border-none"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded"
                />

                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    ₹{item.price}
                  </p>
                  <p className="text-sm mt-1">Quantity: {item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-80">
          <div className="bg-white p-5 rounded shadow-sm sticky top-6">
            <h2 className="font-semibold text-lg border-b pb-3 mb-4">
              Price Details
            </h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Price</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between text-sm mb-2 text-green-600">
              <span>Discount</span>
              <span>- ₹{discount}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Delivery Charges</span>
              <span className="text-green-600">FREE</span>
            </div>

            <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{finalAmount}</span>
            </div>

            <button className="bg-amber-500 hover:bg-amber-600 text-white w-full py-3 rounded mt-5 font-medium">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}