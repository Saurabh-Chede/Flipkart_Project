import { Router } from "express";
import {
  addProduct,
  deleteSellerProduct,
  getSellerProducts,
  updateSellerProduct,
} from "../controllers/seller.controller.js";

import {
  verifyAndDecodeToken,
  isSeller,
} from "../middlewares/auth.middleware.js";

const sellerRouter = Router();

sellerRouter.post(
  "/add-product",
  verifyAndDecodeToken,
  isSeller,
  addProduct
);

sellerRouter.get(
  "/get-products",
  verifyAndDecodeToken,
  isSeller,
  getSellerProducts
);

sellerRouter.patch(
  "/update-product/:productId",
  verifyAndDecodeToken,
  isSeller,
  updateSellerProduct
);

sellerRouter.delete(
  "/delete-product/:productId",
  verifyAndDecodeToken,
  isSeller,
  deleteSellerProduct
);

export default sellerRouter;