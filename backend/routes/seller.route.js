import { Router } from "express";
import {
  addProduct,
  completeSellerProfile,
  deleteSellerProduct,
  getSellerProducts,
  getSellerProfile,
  updateSellerProduct,
  updateSellerProfile,
} from "../controllers/seller.controller.js";

import {
  verifyAndDecodeToken,
  isSeller,
} from "../middlewares/auth.middleware.js";

const sellerRouter = Router();

sellerRouter.post("/add-product", verifyAndDecodeToken, isSeller, addProduct);

sellerRouter.get(
  "/get-products",
  verifyAndDecodeToken,
  isSeller,
  getSellerProducts,
);

sellerRouter.patch(
  "/update-product/:productId",
  verifyAndDecodeToken,
  isSeller,
  updateSellerProduct,
);

sellerRouter.delete(
  "/delete-product/:productId",
  verifyAndDecodeToken,
  isSeller,
  deleteSellerProduct,
);

sellerRouter.post(
  "/profile",
  verifyAndDecodeToken,
  isSeller,
  completeSellerProfile,
);

sellerRouter.patch(
  "/profile",
  verifyAndDecodeToken,
  isSeller,
  updateSellerProfile,
);

sellerRouter.get("/profile", verifyAndDecodeToken, isSeller, getSellerProfile);

export default sellerRouter;
