import { useEffect, useState } from "react";
import api from "@/config/axiosConfig";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

export default function SellerRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/admin/get-requests");

      setRequests(res.data.requests || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const approveSeller = async (userId) => {
    try {
      await api.patch(`/admin/approve-seller/${userId}`);

      setRequests((prev) =>
        prev.filter((user) => user._id !== userId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const rejectSeller = async (userId) => {
    try {
      await api.patch(`/admin/reject-seller/${userId}`);

      setRequests((prev) =>
        prev.filter((user) => user._id !== userId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Seller Requests</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-muted-foreground">
              No pending seller requests.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {requests.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        {user.sellerRequestStatus}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          approveSeller(user._id)
                        }
                      >
                        Approve
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          rejectSeller(user._id)
                        }
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}