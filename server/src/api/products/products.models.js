import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: Array, required: true },
    price: { type: Number, required: true },
    expiration: { type: Date | Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model("Product", productSchema);

export default ProductModel;