import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: Number,
    },
    totalamount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const Order = new mongoose.model("Order", orderSchema);
export default Order;
