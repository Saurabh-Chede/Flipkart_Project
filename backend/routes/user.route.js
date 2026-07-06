import { Router } from "express";
import {
  addToCart,
  deleteUserProfile,
  getCartProducts,
  updateUserProfile,
  applyForSeller,
  updateCartQuantity,
  removeFromCart,
  createAddress,
  getAddresses,
  updateAddress,
  setDefaultAddress,
  deleteAddress,
} from "../controllers/user.controller.js";
import { verifyAndDecodeToken } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/cart", verifyAndDecodeToken, addToCart);
userRouter.patch("/update-profile/:userId", verifyAndDecodeToken, updateUserProfile);
userRouter.delete("/delete-profile/:userId", verifyAndDecodeToken, deleteUserProfile);
userRouter.get("/get-cart-products", verifyAndDecodeToken, getCartProducts);
userRouter.post("/apply-seller", verifyAndDecodeToken, applyForSeller);
userRouter.patch('/cart-quantity',verifyAndDecodeToken,updateCartQuantity)
userRouter.delete('/remove-cart-item/:itemId',verifyAndDecodeToken,removeFromCart)
userRouter.post('/create-address',verifyAndDecodeToken,createAddress)
userRouter.get('/all-addresses',verifyAndDecodeToken,getAddresses)
userRouter.put('/update-address',verifyAndDecodeToken,updateAddress)
userRouter.patch('/set-default-address/:id',verifyAndDecodeToken,setDefaultAddress)
userRouter.delete('/delete-address/:id',verifyAndDecodeToken,deleteAddress)

export default userRouter;
