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

//Creating index
reviewSchema.index({ review_by: 1 });

const Review = new mongoose.model("Review", reviewSchema);
export default Review;
