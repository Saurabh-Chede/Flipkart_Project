import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Kidstoys() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("/toys.json")
      .then(res => res.json())
      .then(data => setCategory(data));
  }, []);

  return (
    <section className="bg-gray-100 py-3">
      <div
        className="
          max-w-7xl bg-white rounded-md
          flex flex-col lg:flex-row
          gap-4 md:mx-9 mx-4
        "
      >
        {/* LEFT */}
        <div className="flex-1 flex flex-col justify-between px-4 py-4">
          <h2 className="text-[22px] font-semibold mb-3">
            Furniture
          </h2>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
            {category.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="
                 flex flex-col items-center
                  text-xs hover:text-blue-600 transition
                "
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="size-39.25 object-contain rounded-md"
              
                />
                <p className="mt-2 text-center text-sm">
                  {product.title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT BANNER */}
        {/* <div className="hidden lg:block w-45">
          <img
            src="/assets/product_images/vertical_banner.png"
            alt="Top deals banner"
            className="w-full h-full object-cover"
          />
        </div> */}
      </div>
    </section>
  );
}