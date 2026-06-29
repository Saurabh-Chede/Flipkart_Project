import { Router } from "express";
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import adminRouter from './admin.route.js'
import sellerRouter from './seller.route.js'
import productRouter from './product.route.js'
import orderRouter from "./order.route.js";
import wishlistRouter from "./wishlist.route.js";
import reviewRouter from './review.route.js'

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/seller", sellerRouter);
mainRouter.use("/order",orderRouter)
mainRouter.use('/wishlist',wishlistRouter)
mainRouter.use('/reviews',reviewRouter)

export default mainRouter;