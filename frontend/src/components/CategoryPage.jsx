import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import api from "@/config/axiosConfig";
import ProductCard from "./category/ProductCard";
import { categories } from "@/constants/categories";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ErrorUi from "./category/ErrorUi";
import SortBar from "./category/SortBar";
import FilterSection from "./category/FilterSection";
import CategoryNavbar from "./category/CategoryNavbar";

export default function CategoryPage() {
  const { category } = useParams();

  const {
    data: products = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category-products", category],

    queryFn: async () => {
      const { data } = await api.get(`/product/category/${category}`);

      return data.products || [];
    },

    placeholderData: keepPreviousData,

    staleTime: 1000 * 60 * 5,
  });

  if (isError) {
    return <ErrorUi error={error} />;
  }

  const [priceFilter, setPriceFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (priceFilter === "under10k") {
      filtered = filtered.filter((p) => p.price < 10000);
    }

    if (priceFilter === "10kto20k") {
      filtered = filtered.filter((p) => p.price >= 10000 && p.price <= 20000);
    }

    if (priceFilter === "above20k") {
      filtered = filtered.filter((p) => p.price > 20000);
    }

    if (sortBy === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, priceFilter, sortBy]);

  return (
    <div className="bg-[#f1f3f6] min-h-screen">
      <CategoryNavbar categories={categories} category={category} />

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-2 py-2 flex gap-2">
        <FilterSection
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
        />

        {/* PRODUCTS */}
        <main className="flex-1">
          <SortBar sortBy={sortBy} setSortBy={setSortBy} />

          {loading ? (
            <div className="text-center py-10">Loading Products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white p-10 text-center rounded-sm">
              No products found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
