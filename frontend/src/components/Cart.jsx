import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/cart.json")
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-4">Loading cart...</p>;
  }

  return (
    <div className="bg-gray-100 py-3.5">
      <div className="mx-4 md:mx-9 rounded-md">
        {/* 👇 items-start is IMPORTANT */}
        <div className="flex gap-4 flex-col md:flex-row items-start">
          {/* LEFT - CART ITEMS */}
          <div className="md:basis-4/6 w-full bg-white flex flex-col gap-3 rounded-md">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 py-6 px-4 border-b border-b-gray-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain"
                  loading="lazy"
                />

                <div className="flex-1">
                  <h2 className="font-medium">{item.title}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                  <p className="text-sm">Qty: {item.qty}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - STICKY PRICE DETAILS */}
          <aside className="md:basis-2/6 w-full bg-white sticky top-20 h-fit self-start rounded-md">
            <h2 className="font-semibold mb-3 border-b text-gray-500 border-b-gray-300 py-2 px-4">
              PRICE DETAILS
            </h2>

            <div className="space-y-2 text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between px-4">
                  <span>{item.title}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <hr className="my-3 text-gray-300" />

            <div className="flex justify-between font-semibold px-4 pb-3">
              <span>Total</span>
              <span>
                ₹{cart.reduce((sum, item) => sum + item.price * item.qty, 0)}
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
