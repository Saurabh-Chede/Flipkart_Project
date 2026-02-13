import { useState } from "react";
import {
  FaGooglePay,
  FaCreditCard,
  FaUniversity,
  FaMoneyBillWave,
  FaLock,
} from "react-icons/fa";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const orderAmount = 54999;

  const paymentMethods = [
    { id: "upi", label: "UPI", icon: <FaGooglePay size={20} /> },
    { id: "card", label: "Credit / Debit Card", icon: <FaCreditCard size={20} /> },
    { id: "netbanking", label: "Net Banking", icon: <FaUniversity size={20} /> },
    { id: "cod", label: "Cash on Delivery", icon: <FaMoneyBillWave size={20} /> },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* LEFT SECTION */}
        <div className="flex-1 md:order-1 order-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">
            Select Payment Method
          </h2>

          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border rounded-xl overflow-hidden mb-4 transition-all duration-300 ${
                selectedMethod === method.id
                  ? "border-amber-500 shadow-md"
                  : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setSelectedMethod(method.id)}
                className="w-full flex items-center gap-3 p-4 font-medium"
              >
                <span className="text-amber-600">{method.icon}</span>
                {method.label}
              </button>

              {selectedMethod === method.id && (
                <div className="p-4 bg-gray-50">
                  
                  {/* UPI */}
                  {method.id === "upi" && (
                    <input
                      type="text"
                      placeholder="Enter UPI ID"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  )}

                  {/* CARD */}
                  {method.id === "card" && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                      />
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-1/2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="w-1/2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* NET BANKING */}
                  {method.id === "netbanking" && (
                    <select className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none">
                      <option>Select Bank</option>
                      <option>SBI</option>
                      <option>HDFC</option>
                      <option>ICICI</option>
                    </select>
                  )}

                  {/* COD */}
                  {method.id === "cod" && (
                    <p className="text-sm text-gray-600">
                      Pay in cash when your order is delivered.
                    </p>
                  )}

                </div>
              )}
            </div>
          ))}

          {/* MAIN PAY BUTTON */}
          <button className="mt-8 bg-amber-500 hover:bg-amber-600 transition-all text-white w-full py-4 rounded-xl text-lg font-semibold shadow-md">
            Pay ₹{orderAmount}
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:order-2 order-1 lg:w-80">
          <div className="bg-white p-6 rounded-xl shadow-sm sticky top-20">
            <h2 className="font-semibold text-lg mb-4 border-b pb-3">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Price</span>
              <span>₹59999</span>
            </div>

            <div className="flex justify-between text-sm mb-2 text-green-600">
              <span>Discount</span>
              <span>- ₹5000</span>
            </div>

            <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{orderAmount}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
              <FaLock />
              100% Secure Payment
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}