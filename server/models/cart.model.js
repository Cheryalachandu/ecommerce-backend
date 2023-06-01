import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    id: Schema.Types.ObjectId,
    product: {
        id: String,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        uniqueId: Number,
        rating: {
          rate: Number,
          count: Number,
        },
      }, 
    quantity : Number,
    uniqueId: Number,
})
cartSchema.set("versionKey", false);
export default model("CartProduct", cartSchema)