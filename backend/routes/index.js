import { Router } from "express";
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import adminRouter from './admin.route.js'
import sellerRouter from './seller.route.js'
import productRouter from './product.route.js'

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/seller", sellerRouter);

export default mainRouter;