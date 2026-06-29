import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/config/axiosConfig";

import { FaTrash, FaShoppingCart } from "react-icons/fa";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  ShoppingBag,
  Heart,
} from "lucide-react";

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

      setWishlist((prev) =>
        prev.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const moveToCart = async (productId) => {
    try {
      await api.post("/user/cart", {
        productId,
        quantity: 1,
      });

      await api.delete(`/wishlist/remove/${productId}`);

      setWishlist((prev) =>
        prev.filter((item) => item._id !== productId)
      );
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
        <p className="text-muted-foreground">
          Loading wishlist...
        </p>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="image" />
        <h2 className="text-2xl font-bold mb-2">
          Your Wishlist is Empty
        </h2>

        <p className="text-muted-foreground text-center mb-6">
          Save items you like in your wishlist.
          Review them anytime and easily move them to cart.
        </p>

        <Button onClick={goToHomePage} className='rounded-none bg-blue-500 py-1.5 hover:bg-blue-600'>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto max-w-6xl px-4">

        <div className="flex items-center gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              My Wishlist
            </h1>

            <p className="text-muted-foreground">
              {wishlist.length} item
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {wishlist.map((item) => (
            <Card
              key={item._id}
              className="overflow-hidden rounded-none"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-6 p-6">

                  {/* Product Image */}
                  <div
                    onClick={() =>
                      navigate(`/product/${item._id}`)
                    }
                    className="cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-36 h-36 object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h2
                      onClick={() =>
                        navigate(`/product/${item._id}`)
                      }
                      className="font-semibold text-lg cursor-pointer hover:text-primary"
                    >
                      {item.name}
                    </h2>

                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-2xl font-bold">
                        ₹{item.price?.toLocaleString()}
                      </span>

                      <span className="text-muted-foreground line-through">
                        ₹
                        {Math.round(
                          item.price * 1.2
                        ).toLocaleString()}
                      </span>

                      <span className="text-green-600 font-medium">
                        20% OFF
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-3">
                      {item.stock > 0
                        ? `Stock : ${item.stock}`
                        : "Out of stock"}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-6">

                      <Button
                        onClick={() =>
                          moveToCart(item._id)
                        }
                        disabled={item.stock <= 0}
                      >
                        <FaShoppingCart />
                        Move To Cart
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() =>
                          removeItem(item._id)
                        }
                      >
                        <FaTrash />
                        Remove
                      </Button>

                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Summary */}
        <Card className="mt-8">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5" />

              <div>
                <p className="font-medium">
                  Total Wishlist Items
                </p>

                <p className="text-muted-foreground text-sm">
                  {wishlist.length} products saved
                </p>
              </div>
            </div>

            <Button onClick={goToHomePage}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
