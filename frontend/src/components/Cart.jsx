import { useEffect } from "react";
import api from "@/config/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  fetchCart,
} from "@/redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = async (itemId) => {
    dispatch(increaseQty(itemId));

    try {
      await api.patch("/user/cart-quantity", {
        itemId,
        type: "inc",
      });
    } catch (err) {
      dispatch(fetchCart());
    }
  };

  const handleDecrease = async (itemId) => {
    dispatch(decreaseQty(itemId));

    try {
      await api.patch("/user/cart-quantity", {
        itemId,
        type: "dec",
      });
    } catch (err) {
      dispatch(fetchCart());
    }
  };

  const handleRemove = async (itemId) => {
    dispatch(removeFromCart(itemId));

    try {
      await api.delete(`/user/remove-cart-item/${itemId}`);
    } catch (err) {
      dispatch(fetchCart());
    }
  };

  const handlebuy = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-muted min-h-screen p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {items.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-muted-foreground">
                Cart is empty
              </CardContent>
            </Card>
          ) : (
            items.map((item) => {
              const finalPrice =
                item.product?.price -
                (item.product?.price *
                  (item.product?.discountPercentage || 0)) /
                  100;

              return (
                <Card key={item._id}>
                  <CardContent className="flex gap-4 p-4">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-24 h-24 object-contain"
                    />

                    <div className="flex-1 space-y-2">
                      <h2 className="font-medium text-lg">
                        {item.product?.name}
                      </h2>

                      <div>
                        <p className="text-lg font-bold">
                          ₹{finalPrice}
                        </p>

                        {(item.product?.discountPercentage || 0) > 0 && (
                          <>
                            <p className="text-sm text-gray-500 line-through">
                              ₹{item.product?.price}
                            </p>

                            <p className="text-green-600 text-sm font-medium">
                              {item.product?.discountPercentage}% OFF
                            </p>
                          </>
                        )}
                      </div>

                      <div className="flex gap-2 items-center">
                        <Button
                          size="sm"
                          onClick={() => handleDecrease(item._id)}
                        >
                          -
                        </Button>

                        <span className="font-medium">
                          {item.quantity}
                        </span>

                        <Button
                          size="sm"
                          onClick={() => handleIncrease(item._id)}
                        >
                          +
                        </Button>
                      </div>

                      <Button
                        variant="destructive"
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* PRICE DETAILS */}
        <Card className="h-fit sticky top-6">
          <CardHeader>
            <CardTitle>Price Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {items.map((item) => {
              const finalPrice =
                item.product?.price -
                (item.product?.price *
                  (item.product?.discountPercentage || 0)) /
                  100;

              return (
                <div
                  key={item._id}
                  className="flex justify-between text-sm"
                >
                  <span>{item.product?.name}</span>

                  <span>
                    ₹{finalPrice * item.quantity}
                  </span>
                </div>
              );
            })}

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>

              {/* Redux totalPrice abhi bhi original price use kar sakta hai */}
              <span>₹{totalPrice}</span>
            </div>

            <Button
              onClick={handlebuy}
              className="w-full mt-4"
            >
              Buy Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}