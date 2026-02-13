import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Topdeals from './Topdeals'
import Clothes from './Clothes'
import Kidstoys from './Kidstoys'

export default function HomePage() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("/homecategory.json")
      .then((res) => res.json())
      .then((data) => setCategory(data));
      
  }, []);

  return (
    <div className="flex flex-col bg-gray-100">
      <div
        className="
         grid grid-cols-3 text-center bg-white mt-2.5 rounded-md mx-4 py-4 md:grid-cols-4 lg:grid-cols-8 md:mx-9 gap-1
        "
      >
        {category.map((product) => (
          <Link
            key={product.id}
            to={`/category/${product.id}`}
            className="flex flex-col items-center text-xs hover:text-blue-600 transition
            "
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-16 h-16 object-contain"
            />
            <div className="flex mt-2 gap-1 items-center">
              <p className=" text-xs lg:text-sm font-normal">{product.title}</p>
              {product.hasSub && (
                <span className="hidden md:inline-block">
                  <ChevronDown size={15} />
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
      <Topdeals/>
      <Clothes/>
      <Kidstoys></Kidstoys>
    </div>
  );
}
