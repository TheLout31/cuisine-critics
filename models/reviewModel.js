const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Review text is required"],
    minlength: [10, "Review must be at least 10 characters long"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, "Restaurant reference is required"],
  },
});

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
