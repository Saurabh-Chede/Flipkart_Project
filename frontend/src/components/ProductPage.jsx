import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    fetch("/products.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id == id);
        setProduct(found);
      });
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  const discount = Math.floor(product.price * 0.25);
  const finalPrice = product.price - discount;

  return (
    <div className="bg-gray-100 pt-6 pb-10">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 p-6">

          {/* LEFT – IMAGE */}
          <div className="md:w-2/5 flex flex-col justify-center items-start">
            <div className="relative rounded-lg p-4 w-full">

              {/* Wishlist Icon */}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-4 right-4 z-10
                  bg-white p-2 rounded-full shadow
                  hover:scale-110 transition"
              >
                {wishlisted ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FiHeart className="text-gray-600 text-xl" />
                )}
              </button>

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-50 md:h-80 object-contain"
              />
            </div>

            <div className="mt-8 flex w-full gap-4">
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
                ADD TO CART
              </button>

              <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-semibold transition">
                BUY NOW
              </button>
            </div>
          </div>

          {/* RIGHT – DETAILS */}
          <div className="md:w-3/5 md:border-l border-l-gray-200 pl-4">

            <h1 className="text-2xl font-semibold text-gray-900">
              {product.title}
            </h1>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {product.description}
            </p>

            {/* PRICE BOX */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{finalPrice.toLocaleString()}
              </span>

              <span className="text-base line-through text-gray-400">
                ₹{product.price.toLocaleString()}
              </span>

              <span className="text-green-600 font-semibold">
                {Math.round((discount / product.price) * 100)}% off
              </span>
            </div>

            <p className="mt-2 text-sm text-green-600 font-medium">
              Free Delivery
            </p>

            {/* HIGHLIGHTS */}
            <div className="mt-8 border-t border-t-gray-300 pt-6">
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✔ 1 Year Warranty</li>
                <li>✔ 7 Days Replacement</li>
                <li>✔ Cash on Delivery available</li>
                <li>✔ Secure packaging</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}