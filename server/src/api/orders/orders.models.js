import { model, Schema } from "mongoose";

const orderedProductSchema = Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    product: {
      type: orderedProductSchema,
      required: true
    },
    purchaseDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: "purchaseDate"
    }
  }
);

const OrderModel = model("Order", orderSchema);

export default OrderModel;