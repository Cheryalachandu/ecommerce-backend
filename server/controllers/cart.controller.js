import CardProduct from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { getUpdateProp } from "../utils/helper.js";

export const getCartProducts = async (req, res) => {
  try {
    const cartProducts = await CardProduct.find({});
    res.json({ cartProducts: cartProducts });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const updateCartProduct = async (req, res) => {
  try {
    const { action, uniqueId } = req?.body;
    const cardProduct = await CardProduct.findOne({ uniqueId: uniqueId });
    console.log(cardProduct)
    const rating = cardProduct.product.rating;
    let updateProps = getUpdateProp(cardProduct, action, rating);
    console.log(updateProps);
    const propssss = {
      ...cardProduct,
      product: {
        ...cardProduct,
        rating: updateProps.rating,
      },
      quantity: updateProps.quantity,
    };
    console.log(propssss);
    await CardProduct.findOneAndUpdate(
      { uniqueId: uniqueId },
      {
        $set: propssss,
      }
    );

    res.json({ message: "successfully updated" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const deleteAllCartProducts = async (req, res) => {
  try {
    const cartItems = await CardProduct.find({});
    for (let cartProduct of cartItems) {
      await Product.findOneAndUpdate(
        { _id: cartProduct?._id },
        {
          $set: {
            quantity: 0,
          },
        }
      );
      await CardProduct.findOneAndDelete({ _id: cartProduct?._id });
    }
    res.json({ message: "cart products cleared successfully" });
  } catch (err) {
    res.json({ message: err.message });
  }
};
