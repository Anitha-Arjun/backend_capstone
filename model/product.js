import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    maxlength: 500,
  },
});

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      required: true,
      unique: true,
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
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
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
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

//Creating index
productSchema.index({ product_id: 1 });

const Product = new mongoose.model("Product", productSchema);
export default Product;
