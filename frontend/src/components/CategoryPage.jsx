import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/config/axiosConfig";

export default function CategoryPage() {
  const { category } = useParams();

  const categories = [
    "electronics",
    "clothing",
    "furniture",
    "food",
    "grocerry",
    "fashion",
  ];

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceFilter, setPriceFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/product/category/${category}`);

        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      } catch (error) {
        console.log("Category Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

    // Price Filters
    if (priceFilter === "under10k") {
      filtered = filtered.filter((p) => p.price < 10000);
    }

    if (priceFilter === "10kto20k") {
      filtered = filtered.filter((p) => p.price >= 10000 && p.price <= 20000);
    }

    if (priceFilter === "above20k") {
      filtered = filtered.filter((p) => p.price > 20000);
    }

    // Sorting
    if (sortBy === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, priceFilter, sortBy]);

  return (
    <div className="bg-[#f1f3f6] min-h-screen">
      {/* CATEGORY NAV */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-6 text-sm font-medium overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className={`whitespace-nowrap transition hover:text-blue-600 ${
                category === cat
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700"
              }`}
            >
              {cat
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Link>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-2 py-2 flex gap-2">
        {/* FILTERS */}
        <aside className="hidden md:block w-64 bg-white p-4 rounded-sm">
          <h4 className="text-base font-semibold mb-4">Filters</h4>

          <div className="mb-6">
            <p className="font-medium mb-2">Price</p>

            <label className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={priceFilter === "under10k"}
                onChange={() => setPriceFilter("under10k")}
              />
              Under ₹10,000
            </label>

            <label className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={priceFilter === "10kto20k"}
                onChange={() => setPriceFilter("10kto20k")}
              />
              ₹10,000 - ₹20,000
            </label>

            <label className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={priceFilter === "above20k"}
                onChange={() => setPriceFilter("above20k")}
              />
              Above ₹20,000
            </label>

            <button
              onClick={() => setPriceFilter("")}
              className="text-blue-600 text-sm mt-2"
            >
              Clear Filter
            </button>
          </div>
        </aside>

        {/* PRODUCTS */}
        <main className="flex-1">
          {/* SORT BAR */}
          <div className="bg-white px-4 py-3 mb-2 flex gap-6 text-sm">
            <span className="font-semibold">Sort By</span>

            <button
              onClick={() => setSortBy("")}
              className={`cursor-pointer ${
                sortBy === "" ? "text-blue-600 font-semibold" : "text-gray-600"
              }`}
            >
              Popularity
            </button>

            <button
              onClick={() => setSortBy("lowToHigh")}
              className={`cursor-pointer ${
                sortBy === "lowToHigh"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              Price ↑
            </button>

            <button
              onClick={() => setSortBy("highToLow")}
              className={`cursor-pointer ${
                sortBy === "highToLow"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              Price ↓
            </button>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading Products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white p-10 text-center rounded-sm">
              No products found.
            </div>
          ) : (
            <>
              {/* <div className="mb-4 text-sm text-gray-600">
                {filteredProducts.length} Products Found
              </div> */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
                {filteredProducts.map((product) => {
                  const finalPrice =
                    product.price -
                    (product.price * (product.discountPercentage || 0)) / 100;

                  return (
                    <Link
                      to={`/product/${product._id}`}
                      key={product._id}
                      className="group bg-white border border-gray-200 rounded-sm p-3 hover:shadow-lg transition-all duration-200"
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
                      <p className="text-xs text-gray-500 mt-1">
                        Free Delivery
                      </p>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
