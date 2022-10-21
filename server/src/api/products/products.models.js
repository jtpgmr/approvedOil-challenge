import { model, Schema } from "mongoose";

export const productTypeEnum = ["Dairy", "Cereal", "Drinks", "Snacks", "Bread", "Fruit", "Other"]

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { 
      type: Schema.Types.Mixed, 
      enum: productTypeEnum,
      default: null
    },
    price: { type: Number, required: true },
    expiration: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model("Product", productSchema);

export default ProductModel;