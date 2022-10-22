import { model, Schema } from "mongoose";

export const productTypeEnum = ["dairy", "cereal", "drinks", "snacks", "bread", "fruit", "dessert", "other"]

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