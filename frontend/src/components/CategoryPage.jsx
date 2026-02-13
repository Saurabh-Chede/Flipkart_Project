import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="bg-[#f1f3f6] min-h-screen">

      {/* CATEGORY NAV */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row gap-6 text-sm font-medium overflow-x-auto">
          <span>Electronics</span>
          <span>TVs & Appliances</span>
          <span>Men</span>
          <span>Women</span>
          <span>Baby & Kids</span>
          <span>Home & Furniture</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4">

        {/* FILTERS */}
        <aside className="hidden md:block w-62.5 bg-white p-4 rounded-sm">
          <h4 className="text-base font-semibold mb-4">Filters</h4>

          <div className="mb-4">
            <p className="font-medium mb-2">Category</p>
            <p className="text-sm text-gray-600">Mobiles</p>
            <p className="text-sm text-gray-600">Smartphones</p>
            <p className="text-sm text-gray-600">Laptops</p>
            <p className="text-sm text-gray-600">Monitors</p>
          </div>

          <div className="mb-4">
            <p className="font-medium mb-2">Price</p>
            <p className="text-sm text-gray-600">Under ₹10,000</p>
            <p className="text-sm text-gray-600">₹10,000 – ₹20,000</p>
            <p className="text-sm text-gray-600">Above ₹20,000</p>
          </div>
        </aside>

        {/* PRODUCTS */}
        <main className="flex-1">

          {/* SORT BAR */}
          <div className="bg-white px-4 py-3 mb-4 flex gap-6 text-sm">
            <span className="font-semibold">Sort By</span>
            <span className="cursor-pointer">Popularity</span>
            <span className="cursor-pointer">Price ↑</span>
            <span className="cursor-pointer">Price ↓</span>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map(product => (
              <Link
                
                to={`/product/${product.id}`}
                key={product.id}
                className="bg-white p-3 rounded-sm hover:shadow transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-cover rounded-md mb-3"
                />

                <p className="text-sm font-medium mb-1">
                  {product.name}
                </p>

                <p className="text-green-600 font-semibold">
                  ₹{product.price}
                </p>

                <p className="text-xs text-gray-500">
                  Free Delivery
                </p>
              </Link>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}