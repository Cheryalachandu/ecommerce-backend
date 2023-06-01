import express from "express"
import { getproducts, addProducts, deleteProduct, getByCategory, getProductById, updateProduct} from "../controllers/products.controller.js";
const productsRouter = express.Router();

productsRouter.route("/").get(getproducts);
productsRouter.route("/:category").get(getByCategory)
productsRouter.route("/").post(addProducts);
productsRouter.route("/").delete(deleteProduct);
productsRouter.route("/:category").put(updateProduct)
productsRouter.route("/:category/:productId").get(getProductById); 
// productsRouter.route("/:category").put(updateProductByCategoryId)
// productsRouter.route("/").put(updateAllProducts)

export default productsRouter;