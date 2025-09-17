const RestaurantModel = require("../models/restaurantModel");


// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const filter = {};
    if (req.query.cuisine) {
      filter.cuisine = req.query.cuisine;
    }

    const restaurants = await RestaurantModel.find(filter);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findByIdAndUpdate(
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
