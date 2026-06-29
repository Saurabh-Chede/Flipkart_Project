import express from "express";

import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

import { verifyAndDecodeToken } from "../middlewares/auth.middleware.js";

const reviewRouter = express.Router();

reviewRouter.get("/:productId", getProductReviews);

reviewRouter.post("/", verifyAndDecodeToken, createReview);

reviewRouter.put("/:id", verifyAndDecodeToken, updateReview);

reviewRouter.delete("/:id", verifyAndDecodeToken, deleteReview);

export default reviewRouter;