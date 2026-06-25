import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/config/axiosConfig";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SellerOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/seller/orders/${id}`);

      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (status) => {
    try {
      await api.patch(
        `/seller/orders/${id}/status`,
        { status }
      );

      setOrder((prev) => ({
        ...prev,
        status,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return (
      <div className="p-6">
        Loading order...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Order # {order.order?.orderNumber}
            </CardTitle>

            <Badge>
              {order.status}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Customer Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p>
              <strong>Name:</strong>{" "}
              {order.user?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.user?.email}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Update Status
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Select
              value={order.status}
              onValueChange={updateStatus}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="PLACED">
                  PLACED
                </SelectItem>

                <SelectItem value="CONFIRMED">
                  CONFIRMED
                </SelectItem>

                <SelectItem value="PACKED">
                  PACKED
                </SelectItem>

                <SelectItem value="SHIPPED">
                  SHIPPED
                </SelectItem>

                <SelectItem value="DELIVERED">
                  DELIVERED
                </SelectItem>

                <SelectItem value="CANCELLED">
                  CANCELLED
                </SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Products
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {order.items?.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border rounded-lg p-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium">
                    {item.title}
                  </h3>

                  <p>
                    Qty: {item.quantity}
                  </p>

                  <p>
                    ₹{item.price}
                  </p>
                </div>

                <div className="font-semibold">
                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Order Summary
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between">
            <span>Total Amount</span>

            <span className="font-bold">
              ₹
              {order.totalAmount?.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}