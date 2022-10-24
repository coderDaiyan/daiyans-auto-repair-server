// Module import section
const express = require("express");
const app = express();
const cors = require("cors");
const admin_router = require("./routes/admins.route");
const services_router = require("./routes/services.route");

// Middleware section
require("dotenv").config();
app.use(cors());
app.use(express.json());

// Routes section
app.use(admin_router);
app.use(services_router);

// Root route section
app.get("/", (req, res) => {
  res.send("Welcome to Daiyan's Auto Repair Service Backend");
});

module.exports = app;
