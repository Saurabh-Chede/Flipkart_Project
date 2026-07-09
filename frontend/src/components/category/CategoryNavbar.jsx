import { Link } from "react-router-dom";

export default function CategoryNavbar({ categories, category }) {
  return (
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
  );
}
