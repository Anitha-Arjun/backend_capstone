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
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    stock_info: {
      type: String,
      enum: ["In stock", "Out of stock", "limited stock"],
      default: "In stock",
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

//Creating index
productSchema.index({ product_id: 1 });

const Product = new mongoose.model("Product", productSchema);
export default Product;
