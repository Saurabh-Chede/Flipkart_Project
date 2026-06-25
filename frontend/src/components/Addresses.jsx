import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import api from "@/config/axiosConfig";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const { data } = await api.get("/user/all-addresses");

      setAddresses(data.addresses || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post(
        "/user/create-address",
        formData
      );

      setAddresses((prev) => [
        data.address,
        ...prev,
      ]);

      setOpen(false);

      setFormData({
        fullName: "",
        phone: "",
        pincode: "",
        addressLine: "",
        city: "",
        state: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/user/delete-address/${id}`);

      setAddresses((prev) =>
        prev.filter(
          (address) => address._id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await api.patch(
        `/user/set-default-address/${id}`
      );

      fetchAddresses();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading addresses...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Add Address */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="w-full flex items-center gap-3 px-6 py-4 text-blue-600 font-medium hover:bg-gray-50 border-b border-gray-200">
            <Plus size={18} />
            ADD A NEW ADDRESS
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              Add New Address
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Pincode</Label>
              <Input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Address Line</Label>
              <Input
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label>State</Label>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Save Address
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Address List */}

      <div className="divide-y divide-gray-200">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="px-6 py-5"
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {address.isDefault && (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                  DEFAULT
                </span>
              )}

              <h3 className="font-medium text-gray-900">
                {address.fullName}
              </h3>

              <span className="text-gray-700">
                {address.phone}
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-6">
              {address.addressLine},{" "}
              {address.city},{" "}
              {address.state} -{" "}
              {address.pincode}
            </p>

            <div className="flex gap-8 mt-4">
              <button className="text-sm font-medium hover:text-blue-600">
                EDIT
              </button>

              <button
                onClick={() =>
                  handleDelete(address._id)
                }
                className="text-sm font-medium hover:text-red-600"
              >
                DELETE
              </button>

              {!address.isDefault && (
                <button
                  onClick={() =>
                    handleSetDefault(
                      address._id
                    )
                  }
                  className="text-sm font-medium hover:text-blue-600"
                >
                  SET AS DEFAULT
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}

      {addresses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <h3 className="text-lg font-medium">
            No Addresses Found
          </h3>

          <p className="text-gray-500 mt-2">
            Add a new address to continue
            shopping.
          </p>
        </div>
      )}
    </div>
  );
}