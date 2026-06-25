import { Router } from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
} from "../controllers/wishlist.controller.js";

import { verifyAndDecodeToken } from "../middlewares/auth.middleware.js";

const wishlistRouter = Router();

wishlistRouter.get(
  "/",
  verifyAndDecodeToken,
  getWishlist
);

wishlistRouter.post(
  "/add",
  verifyAndDecodeToken,
  addToWishlist
);

wishlistRouter.post(
  "/toggle",
  verifyAndDecodeToken,
  toggleWishlist
);

wishlistRouter.delete(
  "/remove/:productId",
  verifyAndDecodeToken,
  removeFromWishlist
);

wishlistRouter.delete(
  "/clear",
  verifyAndDecodeToken,
  clearWishlist
);

export default wishlistRouter;