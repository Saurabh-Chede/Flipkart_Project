import mongoose, { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discountPercentage: {
    type: Number,
    default: 0,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
    enum: ["clothing", "footwear", "electronics", "grocerry", "furniture","food","fashion"],
  },

  stock: {
    type: Number,
    required: true,
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  ratings: {
    type: Number,
    default: 0,
  },

  totalSold: {
    type: Number,
    default: 0,
  },

  numReviews: {
    type: Number,
    default: 0,
  },
});

const ProductModel = model("Product", ProductSchema);

export default ProductModel;
