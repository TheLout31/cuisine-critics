const express = require("express");
const connectToDB = require("./config/mongoDB.config");
const restaurantRouter = require("./routes/restaurant.routes");
const notFound = require("./middleware/routeNotFound");
const app = express();
const PORT = 3000;

connectToDB();

app.get("/", (req, res) => {
  res.json({ message: "Server working fine!!!" });
});

app.use(express.json());

app.use("/api/restaurants", restaurantRouter);

app.use(notFound)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});