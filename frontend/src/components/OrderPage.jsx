import { useEffect, useState } from "react";
import api from "@/config/axiosConfig";
import { FaChevronRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import WriteReviewDialog from "./common/WriteReviewDialog";
import toast from "react-hot-toast";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openReview, setOpenReview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/order/my-orders");

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await api.patch(`/order/cancel/${orderId}`);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: "CANCELLED" }
            : order,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewSubmit = async ({ rating, comment }) => {
    try {
      await api.post("/reviews", {
        productId: selectedProduct.productId,
        rating,
        comment,
      });

      setOpenReview(false);
      setSelectedProduct(null);

      alert("Review Added Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add review");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-200 min-h-screen py-4">
        <div className="max-w-5xl mx-4 md:mx-auto bg-white shadow-sm p-10 text-center">
          Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen py-4">
      <div className="max-w-5xl mx-4 md:mx-auto bg-white shadow-sm">
        {/* Breadcrumb */}
        <div className="py-3 flex items-center px-4 gap-2 text-sm">
          <p className="text-gray-400">My Account</p>
          <FaChevronRight size={14} />
          <p className="font-medium">My Orders</p>
        </div>

        {/* Order Cards */}
        <div className="flex flex-col gap-3 mt-3 mx-2 py-2">
          {orders.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-lg font-medium">No Orders Found</h2>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="border border-gray-200">
                {/* Header */}
                <div className="px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-300">
                  <p className="bg-blue-500 px-3 py-1 text-white text-xs sm:text-sm w-fit">
                    {order.orderNumber}
                  </p>

                  <span className="flex items-center gap-1 border border-gray-300 px-3 py-1 text-sm w-fit cursor-pointer hover:bg-gray-100">
                    <FaLocationDot size={14} className="text-blue-500" />
                    Track
                  </span>
                </div>

                {/* Products */}
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-4 flex flex-col lg:flex-row gap-6 border-b border-gray-100 last:border-b-0"
                  >
                    {/* LEFT SIDE */}
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-contain"
                      />

                      <div className="flex flex-col lg:flex-row lg:justify-between flex-1">
                        <div>
                          <p className="font-medium">{item.title}</p>

                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold">₹ {item.price}</p>

                          <p className="text-xs text-green-600">OFFERS: 1</p>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE */}
                    {index === 0 && (
                      <div className="flex flex-col sm:flex-row justify-between lg:justify-between gap-4 lg:gap-10 flex-1">
                        <div>
                          <p className="text-sm">
                            Order Status <br />
                            <span className="font-medium">
                              {order.orderStatus}
                            </span>
                          </p>

                          <p className="text-xs text-gray-500">
                            Payment: {order.paymentStatus}
                          </p>

                          {order.orderStatus === "DELIVERED" && (
                            <button
                              onClick={() => {
                                setSelectedProduct({
                                  productId: item.product,
                                  title: item.title,
                                });

                                setOpenReview(true);
                              }}
                              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                            >
                              Write Review
                            </button>
                          )}
                        </div>

                        {order.orderStatus !== "CANCELLED" &&
                          order.orderStatus !== "DELIVERED" && (
                            <button
                              onClick={() => handleCancel(order._id)}
                              className="text-sm border border-gray-300 px-2 py-1 h-8 font-medium hover:underline w-fit"
                            >
                              Cancel ✕
                            </button>
                          )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:justify-between border-t border-t-gray-200 px-4 py-2">
                  <p className="text-sm text-gray-700">
                    Ordered On :
                    <b> {new Date(order.createdAt).toLocaleDateString()}</b>
                  </p>

                  <p className="text-sm text-gray-700">
                    Order Total{" "}
                    <b>
                      ₹
                      {order.pricing?.grandTotal ||
                        order.pricing?.itemsTotal ||
                        0}
                    </b>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <WriteReviewDialog
        open={openReview}
        onOpenChange={setOpenReview}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}
