import fs from "fs";
import path from "path";
import Product from "../models/product.model.js";
import { getCategory, getUpdateProp } from "../utils/helper.js";
import CartProduct from "../models/cart.model.js";
import { updateProductConstansts } from "../utils/helper.js";

export const getproducts = async (req, res) => {
  /*
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
*/
  try {
    console.log("fetching the Products");
    const products = await Product.find({});
    res.json({ products: products });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const addProducts = async (req, res) => {
  try {
    console.log("adding products");
    const newProduct = await new Product({
      ...req.body,
      quantity: 0,
    });

    await newProduct.save();
    res.json({ message: "successfully added " });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    console.log("fetching products by category");
    let prop = req.params.category === "product" ? req.query : req.params;
    if (
      prop.category === "mensClothing" ||
      prop.category === "womensClothing"
    ) {
      prop.category = getCategory(prop.category);
    }

    console.log(prop);
    const products = await Product.find(prop);
    res.json(products);
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    console.log("removing the product");
    const product = await Product.findOneAndDelete({ _id: req.body._id });
    res.json({ message: "successfully deleted" });
  } catch (err) {
    res.send({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { _id, action, uniqueId } = req.body;
  try {
    console.log("updating the product");
    const product = await Product.findOne({ _id: _id });
    const rating = product.rating;
    let updateProps = getUpdateProp(product, action, rating);
    console.log(updateProps);
    await Product.findOneAndUpdate(
      { _id: _id },
      {
        $set: updateProps,
      }
    );
    if (
      action === updateProductConstansts.INCREMENT ||
      action === updateProductConstansts.DECREMENT
    ) {
      const cartProduct = await CartProduct.findOne({ uniqueId: uniqueId });

      const quantity = updateProps.quantity;
      if (cartProduct === null) {
        const newCartProduct = await new CartProduct({
          product: { ...product },
          quantity: quantity,
          uniqueId: uniqueId,
        });
        newCartProduct.save();
      } else {
        if (quantity <= 0) {
          await CartProduct.findOneAndDelete({ uniqueId: uniqueId });
        } else {
          await CartProduct.findOneAndUpdate(
            { uniqueId: uniqueId },
            {
              $set: {
                quantity: quantity,
              },
            }
          );
        }
      }
    }
    res.json({ product: updateProps });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const updateProductByCategoryId = async (req, res) => {
  try {
    const category = getCategory(req.params.category);
    const products = await Product.find({ category: category });
    for (let product of products) {
      await Product.findOneAndUpdate(
        { _id: product?._id },
        {
          $set: {
            wishlist: false,
          },
        }
      );
    }
    res.json({ message: "Successfull" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const updateAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    for (let i = 1; i < products.length; i++) {
      await Product.findOneAndUpdate(
        { _id: products[i]?._id },
        {
          $set: {
            uniqueId: i,
          },
        }
      );
    }

    res.json({ message: "updated successfully" });
  } catch (err) {
    res.json({ message: err.message });
  }
};
