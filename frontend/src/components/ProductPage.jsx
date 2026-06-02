import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Tag ,Star} from 'lucide-react';
import { FaShoppingCart } from "react-icons/fa";
import { IoMdFlash } from "react-icons/io";

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
          <div className="md:w-2/5 flex flex-col justify-start items-center">
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
              <button className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 font-semibold transition">
               <FaShoppingCart size={16}/>ADD TO CART
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 py-3 text-white font-semibold transition">
              <IoMdFlash size={16}/>BUY NOW
              </button>
            </div>
          </div>

          {/* RIGHT – DETAILS */}
          <div className="md:w-3/5 md:border-l border-l-gray-200 pl-4">

            <h1 className="text-lg font-semibold text-gray-900">
              {/* Apple iPhone 13 (Starlight, 128 GB) */}
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-1">
              <span className="bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1">
                4.2
                <Star size={12} fill="white" />
              </span>
              <p className="capitalize text-gray-500 text-xs">6,779 ratings and 754 review</p>
            </div>

            {/* PRICE BOX */}
            <div className="mt-2 flex items-center gap-4">
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

            <p className="text-xs text-gray-800">+59 secured packaging fee</p>

            <div className="offers flex flex-col mt-2 pt-2">
              <ul className="flex flex-col gap-3">
                <li className="text-sm text-black font-bold capitalize">available offers</li>
                <li className="flex items-start gap-2">
                  <Tag fill="green" color="white" />
                  <p className="capitalize text-sm">
                    <b>Bank Offer</b> 5% cashback on Flipkart Axis Bank Card
                    <span className="text-blue-700 font-bold cursor-pointer"> T&C</span>
                  </p>
                </li>

                <li className="flex items-start gap-2">
                  <Tag fill="green" color="white" />
                  <p className="capitalize text-sm">
                    Special Price Get extra ₹1,000 off
                    <span className="text-blue-700 font-bold cursor-pointer"> T&C</span>
                  </p>
                </li>

                <li className="flex items-start gap-2">
                  <Tag fill="green" color="white" />
                  <p className="capitalize text-sm">
                    No Cost EMI Starting from ₹2,500/month
                    <span className="text-blue-700 font-bold cursor-pointer"> T&C</span>
                  </p>
                </li>

                <li className="flex items-start gap-2">
                  <Tag fill="green" color="white" />
                  <p className="capitalize text-sm">
                    Partner Offer Sign up for Flipkart Pay Later & get gift card worth ₹500
                    <span className="text-blue-700 font-bold cursor-pointer"> T&C</span>
                  </p>
                </li>

                <li className="flex items-start gap-2">
                  <Tag fill="green" color="white" />
                  <p className="capitalize text-sm">
                    Exchange Offer Up to ₹12,000 off on exchange of old device
                    <span className="text-blue-700 font-bold cursor-pointer"> T&C</span>
                  </p>
                </li>

                <li><p className="text-sm text-blue-700 capitalize font-medium">view 5 more offers</p></li>

              </ul>
            </div>

            <div className="delivery mt-8 border-t border-gray-300 pt-6">
              <h3 className="text-gray-500 font-semibold text-sm mb-3">Delivery</h3>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="border border-gray-300 px-3 py-2 text-sm rounded w-40 focus:outline-none focus:border-blue-500"
                />
                <button className="text-blue-600 font-semibold text-sm">
                  Check
                </button>
              </div>

              <p className="text-sm text-gray-700 mt-3">
                Delivery by <span className="font-semibold">28 Feb, Wednesday</span> |
                <span className="text-green-600 font-semibold"> Free</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-2">
              <p className="text-gray-500 font-semibold text-sm">Highlights</p>
              <ul className="col-span-2 list-disc list-inside text-sm text-gray-700 space-y-2">
                <li>8 GB RAM | 128 GB ROM</li>
                <li>6.5 inch Display</li>
                <li>5000 mAh Battery</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}