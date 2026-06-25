import mongoose from "mongoose";

const sellerOrderSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        title: String,
        image: String,
        price: Number,
        quantity: Number,
        totalPrice: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "PACKED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "RETURNED",
      ],
      default: "PLACED",
    },

    payoutStatus: {
      type: String,
      enum: ["PENDING", "PROCESSING", "PAID"],
      default: "PENDING",
    },

    deliveredAt: Date,
  },
  { timestamps: true },
);

const SellerOrderModel =
  mongoose.models.SellerOrder ||
  mongoose.model("SellerOrder", sellerOrderSchema);

export default SellerOrderModel;
