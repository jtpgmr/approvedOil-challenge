import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["Dairy", "Cereal", "Drinks", "Snacks", "Bread", "Fruit", "Other"],
      required: true 
    },
    price: { type: Number, required: true },
    expiration: { type: Date, required: true, default: null },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model("Product", productSchema);

export default ProductModel;