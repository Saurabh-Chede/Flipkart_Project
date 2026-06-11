import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;