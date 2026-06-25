import { Router } from "express";
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  updatePaymentStatus,
} from "../controllers/order.controller.js";

import { verifyAndDecodeToken } from "../middlewares/auth.middleware.js";

const orderRouter = Router();

orderRouter.post("/place", verifyAndDecodeToken, placeOrder);

orderRouter.get("/my-orders", verifyAndDecodeToken, getUserOrders);

orderRouter.get("/:id", verifyAndDecodeToken, getOrderById);

orderRouter.patch("/cancel/:id", verifyAndDecodeToken, cancelOrder);

orderRouter.patch("/payment/:id",verifyAndDecodeToken,updatePaymentStatus);

export default orderRouter;