import { useEffect, useMemo, useState } from "react";
import { Package, IndianRupee, Star } from "lucide-react";
import api from "@/config/axiosConfig";

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    lowStockCount: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/admin/products");

        setProducts(res.data.products);
        setSummary(res.data.summary);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  const totalRevenue = useMemo(() => {
    return summary.totalRevenue;
  }, [summary]);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        All Products
      </h2>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Total Products
          </p>
          <p className="text-lg sm:text-xl font-semibold">
            {summary.totalProducts}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Total Revenue
          </p>
          <p className="text-lg sm:text-xl font-semibold">
            ₹ {totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Low Stock Items
          </p>
          <p className="text-lg sm:text-xl font-semibold">
            {summary.lowStockCount}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow rounded-xl">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-[950px] w-full text-sm text-left">
            <thead className="bg-gray-100 uppercase text-gray-600">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Seller</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Rating</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">Sold</th>
                <th className="p-4 text-center">Revenue</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-8 text-gray-500"
                  >
                    No Products Found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50"
                  >
                    {/* Product */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover border"
                        />

                        <div>
                          <p className="font-medium">
                            {product.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {product.reviews} Reviews
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 capitalize">
                      {product.category}
                    </td>

                    {/* Seller */}
                    <td className="p-4">
                      {product.seller}
                    </td>

                    {/* Price */}
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center justify-center">
                        <IndianRupee size={14} />
                        {product.price}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1">
                        <Star
                          size={14}
                          className="text-yellow-500 fill-yellow-500"
                        />
                        {product.rating.toFixed(1)}
                      </span>
                    </td>

                    {/* Stock */}
                    <td
                      className={`p-4 text-center font-medium ${
                        product.stock < 20
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.stock}
                    </td>

                    {/* Sold */}
                    <td className="p-4 text-center">
                      {product.sold}
                    </td>

                    {/* Revenue */}
                    <td className="p-4 text-center font-semibold">
                      ₹ {product.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}