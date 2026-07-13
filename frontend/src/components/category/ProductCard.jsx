import { Link } from "react-router-dom";
import { calculateDiscountedPrice } from "@/utils/priceUtils";

export default function ProductCard({ product }) {
  const finalPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <Link
      to={`/product/${product._id}`}
      key={product._id}
      className="group rounded-none p-3 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-gray-300/30  transition-all duration-200"
    >
      {/* Product Image */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden">
        {product.stock <= 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
            Out of Stock
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className={`max-h-full object-contain ${
            product.stock <= 0 ? "opacity-50" : ""
          }`}
        />
      </div>

      {/* Product Name */}
      <h3 className="mt-3 text-sm text-gray-800 line-clamp-2 leading-5 group-hover:text-blue-600">
        {product.name}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-2">
        <span className="bg-green-600 text-white text-[11px] px-1.5 py-0.5 rounded flex items-center">
          {product.ratings?.toFixed(1) || "0.0"}
          <span className="ml-1">★</span>
        </span>

        <span className="text-xs text-gray-500">
          ({product.numReviews || 0})
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <span className="text-lg font-semibold text-gray-900">
          ₹{finalPrice.toLocaleString()}
        </span>

        {(product.discountPercentage || 0) > 0 && (
          <>
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price.toLocaleString()}
            </span>

            <span className="text-sm text-green-600 font-medium">
              {product.discountPercentage}% OFF
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      {product.stock > 0 ? (
        <p className="text-xs text-green-600 mt-2">
          In Stock ({product.stock} left)
        </p>
      ) : (
        <p className="text-xs text-red-600 mt-2 font-medium">
          Currently Unavailable
        </p>
      )}

      {/* Delivery */}
      <p className="text-xs text-gray-500 mt-1">Free Delivery</p>
    </Link>
  );
}
