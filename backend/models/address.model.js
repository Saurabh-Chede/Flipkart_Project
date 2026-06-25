import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
    },

    pincode: {
      type: String,
      required: true,
    },

    addressLine: {
      type: String,
      required: true,
    },

    landmark: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    addressType: {
      type: String,
      enum: ["HOME", "WORK", "OTHER"],
      default: "HOME",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AddressModel = mongoose.model("Address", addressSchema);

export default AddressModel;
