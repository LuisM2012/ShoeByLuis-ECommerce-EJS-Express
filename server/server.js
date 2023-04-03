const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 5500;

// Set Cors
var corsOptions = {
  origin: "http://localhost:8080"
};
app.use(cors(corsOptions));

// parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse static requests
app.use('/api/images', express.static('app/assets'))

// Load up database
const db = require("./app/models");

db.sequelize.sync()
.then(() => {
  console.log("Database Synced.");
})
.catch((err) => {
  console.log("Failed to sync database: " + err.message);
});

// Set simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to my API for ShoesByLuis!" });
});

// Set API routes
require("./app/routes/order.routes")(app);
require("./app/routes/item.routes")(app);
require("./app/routes/itemOrder.routes")(app);
require("./app/routes/zipcode.routes")(app);

// Listen for requests
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
