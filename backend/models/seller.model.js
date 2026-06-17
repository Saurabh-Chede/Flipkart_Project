import { Schema, model } from "mongoose";

const SellerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    gstNumber: {
      type: String,
      trim: true,
      default: "",
    },

    panNumber: {
      type: String,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      required: true,
    },

    businessEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    address: {
      type: String,
      required: true,
    },

    storeLogo: {
      type: String,
      default: "",
    },

    bankDetails: {
      accountHolderName: {
        type: String,
        default: "",
      },

      accountNumber: {
        type: String,
        default: "",
      },

      ifscCode: {
        type: String,
        default: "",
      },

      bankName: {
        type: String,
        default: "",
      },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "blocked"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const SellerModel = model("Seller", SellerSchema);

export default SellerModel;