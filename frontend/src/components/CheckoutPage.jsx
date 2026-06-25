import { useEffect, useState } from "react";
import api from "@/config/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state) => state.cart);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/user/all-addresses");

      const addressList = res.data.addresses || [];

      setAddresses(addressList);

      if (addressList.length > 0) {
        setSelectedAddress(addressList[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deliveryCharge = totalPrice > 500 ? 0 : 40;
  const finalAmount = totalPrice + deliveryCharge;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/order/place", {
        shippingAddressId: selectedAddress,
      });

      navigate(`/payment/${res.data.order._id}`);
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* ADDRESS SECTION */}
          <Card>
            <CardHeader>
              <CardTitle>Select Delivery Address</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {addresses.length === 0 ? (
                <div className="text-muted-foreground">
                  No address found.
                </div>
              ) : (
                addresses.map((address) => (
                  <label
                    key={address._id}
                    className={`flex gap-3 border rounded-lg p-4 cursor-pointer transition ${
                      selectedAddress === address._id
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedAddress === address._id}
                      onChange={() =>
                        setSelectedAddress(address._id)
                      }
                    />

                    <div>
                      <h3 className="font-medium">
                        {address.fullName}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {address.addressLine1}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state} -{" "}
                        {address.pincode}
                      </p>

                      <p className="text-sm">
                        {address.phone}
                      </p>
                    </div>
                  </label>
                ))
              )}
            </CardContent>
          </Card>

          {/* ORDER SUMMARY */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {items.map((item) => {
                const finalPrice =
                  item.product?.price -
                  (item.product?.price *
                    (item.product?.discountPercentage || 0)) /
                    100;

                return (
                  <div
                    key={item._id}
                    className="flex gap-4 border-b pb-4"
                  >
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-24 h-24 object-contain"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium">
                        {item.product?.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-lg">
                          ₹{finalPrice}
                        </span>

                        {(item.product?.discountPercentage || 0) >
                          0 && (
                          <>
                            <span className="line-through text-sm text-gray-500">
                              ₹{item.product?.price}
                            </span>

                            <span className="text-green-600 text-sm">
                              {
                                item.product
                                  ?.discountPercentage
                              }
                              % OFF
                            </span>
                          </>
                        )}
                      </div>

                      <p className="text-sm mt-1">
                        Quantity : {item.quantity}
                      </p>

                      <p className="font-semibold mt-1">
                        ₹{finalPrice * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Price Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charge</span>

                {deliveryCharge === 0 ? (
                  <span className="text-green-600">
                    FREE
                  </span>
                ) : (
                  <span>₹{deliveryCharge}</span>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>₹{finalAmount}</span>
              </div>

              <Button
                className="w-full mt-4"
                onClick={handlePlaceOrder}
                disabled={
                  loading ||
                  items.length === 0 ||
                  !selectedAddress
                }
              >
                {loading
                  ? "Placing Order..."
                  : "PLACE ORDER"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}