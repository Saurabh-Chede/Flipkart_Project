import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        seller: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        title: String,
        image: String,

        originalPrice: {
          type: Number,
          required: true,
        },

        discountPercentage: {
          type: Number,
          default: 0,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],

    pricing: {
      itemsTotal: Number,
      discount: Number,
      deliveryCharge: Number,
      grandTotal: Number,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "CARD", "NETBANKING"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    orderStatus: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "PACKED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PLACED",
    },
  },
  { timestamps: true },
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
