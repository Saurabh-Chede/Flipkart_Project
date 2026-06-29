import { useState } from "react";
import api from "@/config/axiosConfig";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function BecomeSellerRequest() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    try {
      setLoading(true);

      const res = await api.post("/user/apply-seller", {
        message,
      });

      alert(res.data.message);
      setMessage("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to submit request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-4">
      <Card className="w-full max-w-xl rounded-none">
        <CardHeader>
          <CardTitle>Become a Seller</CardTitle>
          <CardDescription>
            Submit your request to start selling on our platform.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Textarea
            rows={5}
            placeholder="Tell us about your business..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='rounded-none'
          />

          <Button
            className="w-full rounded-none bg-blue-500 hover:bg-blue-600"
            onClick={handleRequest}
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Request Seller Access"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}