import express from "express"
import { getproducts, getElectronics} from "../controllers/products.controller.js";
const productsRouter = express.Router();

productsRouter.route("/").get(getproducts);
productsRouter.route("/electronics").get(getElectronics)

export default productsRouter;