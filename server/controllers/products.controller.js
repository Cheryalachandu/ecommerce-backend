import fs from "fs";
import path from "path";
import Product from "../models/product.model.js";

export const getproducts = async (req, res) => {
  try {
    const productsFilePath = path.join(
      process.cwd(),
      "../server/data/products.json"
    );
    const productsResponse = fs.readFileSync(productsFilePath, "utf8");
    const products = JSON.parse(productsResponse);
    res.json({
      message: "fetched Products successfully",
      products: JSON.parse(products),
    });
  } catch (err) {
    res.send({ message: err.message });
  }
};


export const getElectronics = async(req, res) => {
   try {

   } catch(err) {
      res.send({ message: err.message });
   }
}
