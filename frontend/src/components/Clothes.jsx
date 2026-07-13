
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function Clothes() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("/clothes.json")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className=" py-4">
      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-white rounded-md shadow-sm p-4">

          <h2 className="text-xl font-semibold mb-4">
            Trending Fashion
          </h2>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="space-y-2 text-center">
                  <Skeleton className="h-28 w-full rounded-lg" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

              {category.map((product) => (
                <Link
                  key={product.id}
                  to={`/category/clothing`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition flex items-center justify-center w-full">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full object-contain"
                    />
                  </div>
                </Link>
              ))}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}