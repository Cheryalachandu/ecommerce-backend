import { Schema, model } from "mongoose";

const productSchema = new Schema({
  id: Schema.Types.ObjectId,
  uniqueId: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
  quantity: Number,
  price: Number,
  wishlist: Boolean,
});
productSchema.set("versionKey", false);

export default model("Product", productSchema);
