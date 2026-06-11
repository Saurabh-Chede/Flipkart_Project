import { Router } from "express";
import {
  addToCart,
  applyCoupon,
  deleteUserProfile,
  getCartProducts,
  getUserOrders,
  placeOrder,
  updateUserProfile,
  applyForSeller,
} from "../controllers/user.controller.js";
import { verifyAndDecodeToken } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/cart", verifyAndDecodeToken, addToCart);
userRouter.get("/orders", verifyAndDecodeToken, getUserOrders);
userRouter.patch("/update-profile/:userId", verifyAndDecodeToken, updateUserProfile);
userRouter.delete("/delete-profile/:userId", verifyAndDecodeToken, deleteUserProfile);
userRouter.get("/get-cart-products", verifyAndDecodeToken, getCartProducts);
userRouter.post("/place-orders", verifyAndDecodeToken, placeOrder);
userRouter.post("/apply-coupon", verifyAndDecodeToken, applyCoupon);
userRouter.post("/apply-seller", verifyAndDecodeToken, applyForSeller);

export default userRouter;
