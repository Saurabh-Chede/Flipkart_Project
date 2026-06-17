// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function Topdeals() {
//   const [category, setCategory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);

//     fetch("/top_deals.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setCategory(data);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <section className="bg-gray-100 py-4">
//       <div className="max-w-7xl mx-auto px-4">

//         <div className="bg-white rounded-md shadow-sm p-4">

//           {/* HEADER */}
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Top Deals</h2>

//             <Button variant="outline" size="sm">
//               View All
//             </Button>
//           </div>

//           {/* LOADER */}
//           {loading ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//               {Array(6).fill(0).map((_, i) => (
//                 <div key={i} className="space-y-2 text-center">
//                   <Skeleton className="h-28 w-full rounded-lg" />
//                   <Skeleton className="h-4 w-16 mx-auto" />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

//               {category.map((product) => (
//                 <Link
//                   key={product.id}
//                   to={`/product/${product.id}`}
//                   className="group flex flex-col items-center text-center"
//                 >
//                   <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition flex items-center justify-center w-full">
//                     <img
//                       src={product.image}
//                       alt={product.title}
//                       className="max-h-full object-contain group-hover:scale-105 transition"
//                     />
//                   </div>
//                 </Link>
//               ))}

//             </div>
//           )}

//         </div>

//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/config/axiosConfig";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Topdeals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTopDeals = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/product/get-products");
      console.log(data.products);

      // Agar response { success:true, products:[...] } hai
      setProducts(data.products);

      // Agar direct array aa raha hai to:
      // setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopDeals();
  }, []);

  return (
    <section className="bg-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-md shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Top Deals</h2>

            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-2 text-center">
                    <Skeleton className="h-28 w-full rounded-lg" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition flex items-center justify-center w-full h-40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain group-hover:scale-105 transition"
                    />
                  </div>

                  <h3 className="mt-2 text-sm font-medium line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-green-600 font-semibold">
                    ₹{product.price}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
