import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/config/axiosConfig";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Tag, Star } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdFlash } from "react-icons/io";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/product/get-product/${id}`);
        console.log(data.product)

        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-red-500">
          Product not found
        </p>
      </div>
    );
  }

  const discount = Math.floor(product.price * 0.25);
  const finalPrice = product.price - discount;

  return (
    <div className="bg-gray-100 pt-6 pb-10 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 p-6">

          {/* LEFT SECTION */}
          <div className="md:w-2/5 flex flex-col justify-start items-center">

            <div className="relative p-4 w-full">

              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow hover:scale-110 transition"
              >
                {wishlisted ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FiHeart className="text-gray-600 text-xl" />
                )}
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 md:h-96 object-contain"
              />
            </div>

            <div className="mt-8 flex w-full gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 font-semibold transition">
                <FaShoppingCart size={16} />
                ADD TO CART
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 py-3 text-white font-semibold transition">
                <IoMdFlash size={16} />
                BUY NOW
              </button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="md:w-3/5 md:border-l border-l-gray-200 md:pl-8">

            <h1 className="text-xl font-semibold text-gray-900">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1">
                4.2
                <Star size={12} fill="white" />
              </span>

              <p className="text-gray-500 text-sm">
                6,779 Ratings & 754 Reviews
              </p>
            </div>

            {/* PRICE */}
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <span className="text-3xl font-bold text-gray-900">
                ₹{finalPrice.toLocaleString()}
              </span>

              <span className="text-lg line-through text-gray-400">
                ₹{product.price.toLocaleString()}
              </span>

              <span className="text-green-600 font-semibold">
                {Math.round((discount / product.price) * 100)}% OFF
              </span>
            </div>

            <p className="text-sm text-gray-700 mt-1">
              + ₹59 Secured Packaging Fee
            </p>

            {/* OFFERS */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Available Offers
              </h3>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Tag fill="green" color="white" size={18} />
                  <p className="text-sm">
                    <b>Bank Offer:</b> 5% Cashback on Flipkart Axis Bank Card
                    <span className="text-blue-600 font-medium ml-1">
                      T&C
                    </span>
                  </p>
                </li>

                <li className="flex items-start gap-2">
                  <Tag fill="green" color="white" size={18} />
                  <p className="text-sm">
                    <b>Special Price:</b> Get Extra ₹1,000 Off
                    <span className="text-blue-600 font-medium ml-1">
                      T&C
                    </span>
                  </p>
                </li>

                <li className="flex items-start gap-2">
                  <Tag fill="green" color="white" size={18} />
                  <p className="text-sm">
                    <b>No Cost EMI:</b> Starting From ₹2,500/month
                    <span className="text-blue-600 font-medium ml-1">
                      T&C
                    </span>
                  </p>
                </li>

                <li className="flex items-start gap-2">
                  <Tag fill="green" color="white" size={18} />
                  <p className="text-sm">
                    <b>Exchange Offer:</b> Up To ₹12,000 Off
                    <span className="text-blue-600 font-medium ml-1">
                      T&C
                    </span>
                  </p>
                </li>
              </ul>
            </div>

            {/* DELIVERY */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-gray-600 font-semibold mb-3">
                Delivery
              </h3>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="border px-3 py-2 rounded text-sm w-44 focus:outline-none focus:border-blue-500"
                />

                <button className="text-blue-600 font-semibold text-sm">
                  Check
                </button>
              </div>

              <p className="text-sm mt-3">
                Delivery by{" "}
                <span className="font-semibold">
                  Tomorrow
                </span>
                {" | "}
                <span className="text-green-600 font-semibold">
                  Free Delivery
                </span>
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-4 border-t">
              <p className="text-gray-500 font-semibold">
                Description
              </p>

              <div className="md:col-span-2">
                <p className="text-sm text-gray-700 leading-6">
                  {product.description}
                </p>
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-4 border-t">
              <p className="text-gray-500 font-semibold">
                Product Details
              </p>

              <div className="md:col-span-2 space-y-2 text-sm">
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>

                <p>
                  <span className="font-medium">Stock:</span>{" "}
                  {product.stock > 0 ? (
                    <span className="text-green-600">
                      {product.stock} Available
                    </span>
                  ) : (
                    <span className="text-red-500">
                      Out of Stock
                    </span>
                  )}
                </p>

                <p>
                  <span className="font-medium">Product ID:</span>{" "}
                  {product._id}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}