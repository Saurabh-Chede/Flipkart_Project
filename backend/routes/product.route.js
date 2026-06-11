import { Router } from "express";
import {
  filterProducts,
  getPaginatedProducts,
  searchProducts,
} from "../controllers/product.controller.js";


const productRouter = Router();

productRouter.get("/sort", filterProducts);
productRouter.get("/pagination", getPaginatedProducts);
productRouter.get("/search", searchProducts);

export default productRouter;
