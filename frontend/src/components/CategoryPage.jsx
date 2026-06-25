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
      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4">
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
          <div className="bg-white px-4 py-3 mb-4 flex gap-6 text-sm">
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
              <div className="mb-4 text-sm text-gray-600">
                {filteredProducts.length} Products Found
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="bg-white p-3 rounded-sm hover:shadow-md transition"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-40 w-full object-contain rounded-md mb-3"
                    />

                    <p className="text-sm font-medium mb-1 line-clamp-2">
                      {product.name}
                    </p>

                    <p className="text-green-600 font-semibold">
                      ₹{product.price}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">Free Delivery</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
