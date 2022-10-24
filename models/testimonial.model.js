const mongoose = require("mongoose");

const TestimonialSchema = mongoose.Schema({
  name: String,
  company: String,
  review: {
    type: String,
    required: true,
  },
  img: String,
});

const TestimonialModel = mongoose.model("testimonial", TestimonialSchema);
module.exports = TestimonialModel;
