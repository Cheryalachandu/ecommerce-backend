import { Schema, model} from "mongoose";

const wishListSchema = new Schema({
    product :  {
        id: Schema.Types.ObjectId,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        rating: {
          rate: Number,
          count: Number,
        },
      }
})