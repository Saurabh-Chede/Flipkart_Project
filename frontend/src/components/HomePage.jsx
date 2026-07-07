import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Topdeals from "./Topdeals";
import Clothes from "./Clothes";
import Kidstoys from "./Kidstoys";
import Banner from "./Banner";

export default function HomePage() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("/homecategory.json")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);

  return (
    <div className="flex flex-col px-0 md:px-4.5 bg-gray-100">
      <div className="bg-white mt-2.5 rounded-xs shadow-sm mx-4 md:mx-9 py-4">
        <div className="flex justify-between gap-4 overflow-x-auto px-4 scrollbar-hide">
          {category.map((product) => (
            <Link
              key={product.id}
              to={`/category/${product.category}`}
              className="flex flex-col items-center min-w-[80px] group"
            >
              {/* ICON BOX */}
              <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-gray-50 flex items-center justify-center shadow-sm group-hover:shadow-md transition-transform group-hover:scale-105">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* TITLE */}
              <div className="flex mt-2 items-center gap-1 text-center">
                <p className="text-xs md:text-sm font-medium group-hover:text-blue-600">
                  {product.title}
                </p>

              </div>
            </Link>
          ))}
        </div>
      </div>
      <Banner/>
      <Topdeals />
      <Clothes />
      <Kidstoys/>
    </div>
  );
}
