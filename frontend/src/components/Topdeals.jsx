import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/config/axiosConfig";
import { Skeleton } from "@/components/ui/skeleton";

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
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-md shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Top Deals</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2 text-center">
                  <Skeleton className="h-40 w-full rounded-lg" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition flex items-center justify-center w-full h-40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <h3 className="mt-2 text-sm font-medium line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-green-600 font-semibold">
                    ₹{product.price}
                  </p>

                  <span className="text-xs text-red-500 font-medium">
                    {product.discountPercentage}% OFF
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
