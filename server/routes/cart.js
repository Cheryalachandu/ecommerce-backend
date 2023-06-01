import express from "express";
import { getCartProducts, deleteAllCartProducts, updateCartProduct } from "../controllers/cart.controller.js";

const cartRouter = express.Router();


cartRouter.route("/").get(getCartProducts);
cartRouter.route("/").delete(deleteAllCartProducts);
cartRouter.route("/").put(updateCartProduct)

export default cartRouter