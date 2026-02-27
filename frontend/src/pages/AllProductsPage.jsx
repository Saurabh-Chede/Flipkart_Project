import { useMemo } from "react";
import { Package, IndianRupee, Star } from "lucide-react";

export default function AllProductsPage() {
  const products = [
    { id: 1, name: "Men's T-Shirt", price: 799, seller: "Fashion Hub", rating: 4.2, stock: 120, category: "Clothing", sold: 340 },
    { id: 2, name: "Wireless Headphones", price: 2499, seller: "Tech World", rating: 4.5, stock: 45, category: "Electronics", sold: 210 },
    { id: 3, name: "Smart Watch", price: 3999, seller: "Gadget Zone", rating: 4.1, stock: 30, category: "Electronics", sold: 180 },
    { id: 4, name: "Gaming Mouse", price: 1299, seller: "Tech World", rating: 4.4, stock: 15, category: "Accessories", sold: 250 },
    { id: 5, name: "Office Chair", price: 6999, seller: "Home Comfort", rating: 4.0, stock: 10, category: "Furniture", sold: 95 },
    { id: 6, name: "LED Monitor", price: 8999, seller: "Tech World", rating: 4.6, stock: 8, category: "Electronics", sold: 120 },
    { id: 7, name: "Kids Toy Car", price: 999, seller: "Toy Planet", rating: 4.3, stock: 60, category: "Toys", sold: 300 },
    { id: 8, name: "Bluetooth Speaker", price: 1599, seller: "Sound Hub", rating: 4.2, stock: 75, category: "Electronics", sold: 190 },
    { id: 9, name: "Dining Table", price: 14999, seller: "Home Comfort", rating: 4.1, stock: 5, category: "Furniture", sold: 40 },
    { id: 10, name: "Phone Case", price: 499, seller: "Mobile Hub", rating: 4.0, stock: 200, category: "Accessories", sold: 500 },
  ];

  const totalRevenue = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price * p.sold, 0);
  }, [products]);

  const lowStockCount = products.filter((p) => p.stock < 20).length;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">All Products</h2>

      {/* ✅ Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Products</p>
          <p className="text-lg sm:text-xl font-semibold">{products.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-lg sm:text-xl font-semibold">
            ₹ {totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Low Stock Items</p>
          <p className="text-lg sm:text-xl font-semibold">{lowStockCount}</p>
        </div>
      </div>

      {/* ✅ Responsive Table */}
      <div className="bg-white shadow rounded-xl">
        <div className="overflow-x-auto">
          <table className="min-w-237.5 w-full table-fixed text-sm text-left">
            <thead className="bg-gray-100 uppercase text-gray-600">
              <tr>
                <th className="p-4 w-55">Product</th>
                <th className="p-4 w-35">Category</th>
                <th className="p-4 w-37.5">Seller</th>
                <th className="p-4 w-30 text-center">Price</th>
                <th className="p-4 w-30 text-center">Rating</th>
                <th className="p-4 w-25 text-center">Stock</th>
                <th className="p-4 w-37.5 text-center">Revenue</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-t-gray-300 hover:bg-gray-50 transition"
                >
                  {/* Product */}
                  <td className="p-4 flex items-center gap-2">
                    <Package size={14} />
                    {product.name}
                  </td>

                  {/* Category */}
                  <td className="p-4">{product.category}</td>

                  {/* Seller */}
                  <td className="p-4">{product.seller}</td>

                  {/* Price */}
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center gap-1">
                      <IndianRupee size={14} />
                      {product.price}
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center gap-1">
                      <Star size={14} className="text-yellow-500" />
                      {product.rating}
                    </span>
                  </td>

                  {/* Stock */}
                  <td
                    className={`p-4 text-center ${
                      product.stock < 20
                        ? "text-red-600 font-semibold"
                        : ""
                    }`}
                  >
                    {product.stock}
                  </td>

                  {/* Revenue */}
                  <td className="p-4 text-center">
                    ₹ {(product.price * product.sold).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}