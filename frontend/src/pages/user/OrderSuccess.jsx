import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8 text-center">

        <CheckCircle2
          size={80}
          className="mx-auto text-green-600 mb-4"
        />

        <h1 className="text-3xl font-bold mb-2">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-muted-foreground mb-6">
          Thank you for shopping with us.
          Your order has been placed successfully.
        </p>

        <div className="bg-muted rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            Order ID
          </p>

          <p className="font-semibold break-all">
            {id}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="flex-1"
            onClick={() => navigate("/orders")}
          >
            View Orders
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}