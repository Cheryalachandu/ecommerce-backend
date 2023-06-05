import express from "express";
import {
  getproducts,
  addProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/products.controller.js";
const productsRouter = express.Router();

productsRouter.route("/").get(getproducts);
// productsRouter.route("/:productView").get(getProductById);
productsRouter.route("/:category").get(getProduct);
productsRouter.route("/").post(addProducts);
productsRouter.route("/").delete(deleteProduct);
productsRouter.route("/:category").put(updateProduct);
// productsRouter.route("/:category/:productId").get(getProductById);
// productsRouter.route("/:category").put(updateProductByCategoryId)
// productsRouter.route("/").put(updateAllProducts)

export default productsRouter;
