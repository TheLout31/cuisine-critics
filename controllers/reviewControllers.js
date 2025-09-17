const Review = require("../models/reviewModel");
const Restaurant = require("../models/restaurantModel");

// Helper: recalculate average rating
const calculateAverageRating = async (restaurantId) => {
  const stats = await Review.aggregate([
    { $match: { restaurant: restaurantId } },
    {
      $group: {
        _id: "$restaurant",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  const averageRating = stats.length > 0 ? stats[0].avgRating : 0;
  await Restaurant.findByIdAndUpdate(restaurantId, { averageRating });
};

// Create a new review for a restaurant
exports.createReview = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const review = await Review.create({
      ...req.body,
      restaurant: restaurantId,
    });

    // Update restaurant average rating
    await calculateAverageRating(restaurantId);

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews for a restaurant
exports.getReviewsForRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const reviews = await Review.find({ restaurant: restaurantId });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    // Update restaurant average rating after deletion
    await calculateAverageRating(review.restaurant);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
