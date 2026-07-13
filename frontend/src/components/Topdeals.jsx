import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/config/axiosConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateDiscountedPrice } from "@/utils/priceUtils";

export default function TopDeals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopDeals = async () => {
      try {
        const { data } = await api.get("/product/top-deals");
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching top deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDeals();
  }, []);

  return (
    <section className="">
      <div className="max-w-7xl mx-auto md:px-2">
        <div className="bg-white rounded-md p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Top Deals</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-44 w-full rounded-md" />

                  <Skeleton className="h-4 w-full" />

                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {products.map((product) => {
                const finalPrice = calculateDiscountedPrice(
                  product.price,
                  product.discountPercentage,
                );
                return (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="group"
                  >
                    <div className="bg-white">
                      {/* Product Image */}
                      <div className="relative bg-gray-100 h-60 rounded-md overflow-hidden flex items-center justify-center">
                        <img
                          height={250}
                          width={250}
                          loading="lazy"
                          decoding="async"
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                        />

                        {/* Rating */}
                        <div className="absolute bottom-2 left-2">
                          <span className="bg-white rounded px-2 py-1 text-xs font-semibold shadow-sm flex items-center gap-1">
                            {product.ratings || "0"}
                            <span className="text-green-600">★</span>
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="pt-2 px-1">
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
                          {product.name}
                        </h3>

                        <div className="flex items-center gap-2 mt-1">
                          {product.discountPercentage > 0 && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{product.price}
                            </span>
                          )}

                          <span className="text-sm font-bold text-gray-900">
                            ₹{finalPrice}
                          </span>
                        </div>

                        {product.discountPercentage && (
                          <p className="text-xs text-gray-500 mt-1">
                            {product.discountPercentage}% off
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
