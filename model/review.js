import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  review_by: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = new mongoose.model("Review", reviewSchema);
export default Review;
