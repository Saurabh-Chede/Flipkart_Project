import { Router } from "express";
import {
  filterProducts,
  getAllProducts,
  getPaginatedProducts,
  getProductById,
  getProductsByCategory,
  getTopDeals,
  searchProducts,
} from "../controllers/product.controller.js";


const productRouter = Router();

productRouter.get("/sort", filterProducts);
productRouter.get("/pagination", getPaginatedProducts);
productRouter.get("/search", searchProducts);
productRouter.get('/get-products',getAllProducts)
productRouter.get('/top-deals',getTopDeals)
productRouter.get('/get-product/:id',getProductById)
productRouter.get('/category/:category',getProductsByCategory)

export default productRouter;
