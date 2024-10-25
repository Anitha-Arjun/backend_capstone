import mongoose from "mongoose";
import { itemSchema } from "./item.js";

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: Number,
    },
    total_amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
      required: true,
    },
    items: [itemSchema],
  },
  { timestamps: true }
);

//Creating index on order_id
orderSchema.index({ order_id: 1 });

const Order = new mongoose.model("Order", orderSchema);
export default Order;
