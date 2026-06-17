import { Router } from "express";
import {
  getAllSellers,
  getAllUsers,
  getUserById,
  approveSeller,
  rejectSeller,
  getSellerRequests,
} from "../controllers/admin.controller.js";
import {
  verifyAndDecodeToken,
  isAdmin,
} from "../middlewares/auth.middleware.js";

const adminRouter = Router();

adminRouter.get("/", (req, res) => {
  res.send("this is admin route");
});

adminRouter.get("/all-users", verifyAndDecodeToken, isAdmin, getAllUsers);
adminRouter.get("/single-user/:id", verifyAndDecodeToken, isAdmin, getUserById);
adminRouter.get("/all-sellers", verifyAndDecodeToken, isAdmin, getAllSellers);
adminRouter.patch(
  "/approve-seller/:userId",
  verifyAndDecodeToken,
  isAdmin,
  approveSeller,
);
adminRouter.patch(
  "/reject-seller/:userId",
  verifyAndDecodeToken,
  isAdmin,
  rejectSeller,
);
adminRouter.get(
  "/get-requests",
  verifyAndDecodeToken,
  isAdmin,
  getSellerRequests,
);

export default adminRouter;
