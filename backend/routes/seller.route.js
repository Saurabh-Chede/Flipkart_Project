import { Router } from "express";
import {
  addProduct,
  completeSellerProfile,
  deleteSellerProduct,
  getSellerDashboardStats,
  getSellerLowStock,
  getSellerOrderById,
  getSellerOrders,
  getSellerProducts,
  getSellerProfile,
  getSellerRecentOrders,
  updateSellerOrderStatus,
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

sellerRouter.get('/dashboard/stats',verifyAndDecodeToken,isSeller,getSellerDashboardStats)

sellerRouter.get('/low-stock',verifyAndDecodeToken,isSeller,getSellerLowStock)

sellerRouter.get('/recent-orders',verifyAndDecodeToken,isSeller,getSellerRecentOrders)

sellerRouter.get(
  "/orders",
  verifyAndDecodeToken,
  isSeller,
  getSellerOrders
);

sellerRouter.get(
  "/orders/:id",
  verifyAndDecodeToken,
  isSeller,
  getSellerOrderById
);

sellerRouter.patch(
  "/orders/:id/status",
  verifyAndDecodeToken,
  isSeller,
  updateSellerOrderStatus
);

export default sellerRouter;
