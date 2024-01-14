const mongoose = require("mongoose");

const ServicesSchema = mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const ServiceModel = mongoose.model("Model", ServicesSchema, "services");
module.exports = ServiceModel;
