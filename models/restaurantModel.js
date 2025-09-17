const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Restaurant name is required"],
    unique: true,
    trim: true,
  },
  cuisine: {
    type: String,
    required: [true, "Cuisine type is required"],
    enum: {
      values: ["Italian", "Mexican", "Indian", "Chinese", "Other"],
      message: "Cuisine must be one of: Italian, Mexican, Indian, Chinese, Other",
    },
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  averageRating: {
    type: Number,
    default: 0,
  },
});

const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);

module.exports = RestaurantModel;
