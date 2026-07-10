import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/config/axiosConfig";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/wishlist");

      setWishlist(data.wishlist?.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/wishlist/remove/${productId}`);

      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  const goToHomePage = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-muted-foreground">Loading wishlist...</p>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <img
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png"
          alt="image"
        />
        <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>

        <p className="text-muted-foreground text-center mb-6">
          Save items you like in your wishlist.
        </p>

        <Button
          onClick={goToHomePage}
          className="rounded-none bg-blue-500 py-1.5 hover:bg-blue-600"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto bg-white border">
        {/* Header */}
        <div className="px-6 py-5 border-b">
          <h1 className="text-[17px] font-semibold">
            My Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlist.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-start px-6 py-6 border-b last:border-b-0"
          >
            <div className="flex gap-6">
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                onClick={() => navigate(`/product/${item._id}`)}
                className="w-24 h-24 object-contain cursor-pointer"
              />

              {/* Details */}
              <div>
                <h2
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="text-[15px] hover:text-blue-600 cursor-pointer"
                >
                  {item.name}
                </h2>

                {/* Assured */}
                <img
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_9e47c1.png"
                  alt="Assured"
                  className="h-5 mt-1"
                />

                {/* Price */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-[22px] font-semibold">
                    ₹{item.price.toLocaleString()}
                  </span>

                  <span className="text-gray-400 text-[14px] line-through">
                    ₹{Math.round(item.price * 1.3).toLocaleString()}
                  </span>

                  <span className="text-green-600 text-[13px] font-medium">
                    23% off
                  </span>
                </div>
              </div>
            </div>

            {/* Delete */}
            <button
              onClick={() => removeItem(item._id)}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <FaTrash className="text-lg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
