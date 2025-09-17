const express = require("express");
const restaurantController = require("../controllers/restaurantControllers");
const reviewController = require("../controllers/reviewControllers");

const restaurantRouter = express.Router();

// Restaurant Routes
restaurantRouter.post("/", restaurantController.createRestaurant);
restaurantRouter.get("/", restaurantController.getRestaurants);
restaurantRouter.get("/:restaurantId", restaurantController.getRestaurantById);
restaurantRouter.put("/:restaurantId", restaurantController.updateRestaurant);

// Review Routes (nested under restaurants)
restaurantRouter.post("/:restaurantId/reviews", reviewController.createReview);
restaurantRouter.get("/:restaurantId/reviews", reviewController.getReviewsForRestaurant);

// Review delete (not nested, direct access)
restaurantRouter.delete("/reviews/:reviewId", reviewController.deleteReview);

module.exports = restaurantRouter;
