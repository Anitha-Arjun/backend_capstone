import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock_info: {
      enum: ["In stock", "Out of stock", "limited stock"],
      default: "In stock",
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps }
);

const Product = new mongoose.model("Product", productSchema);
export default Product;
