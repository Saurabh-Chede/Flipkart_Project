import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import {verifyAndDecodeToken} from '../middlewares/auth.middleware.js'

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get('/me', verifyAndDecodeToken, getCurrentUser)

export default authRouter;
