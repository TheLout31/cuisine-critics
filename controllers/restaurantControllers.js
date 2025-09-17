const Restaurant = require("../models/restaurantModel");

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all restaurants (with optional cuisine filter)
exports.getRestaurants = async (req, res) => {
  try {
    const filter = {};
    if (req.query.cuisine) {
      filter.cuisine = req.query.cuisine;
    }

    const restaurants = await Restaurant.find(filter);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
