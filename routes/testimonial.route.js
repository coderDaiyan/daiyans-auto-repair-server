const ServiceModel = require("../models/services.model");
const TestimonialModel = require("../models/testimonial.model");

const router = require("express").Router();

router.get("/testimonials", async (req, res) => {
  try {
    const result = await TestimonialModel.find({});

    res.status(200).send(result);
  } catch (e) {
    res.status(400).json({ errror: e.message });
  }
});

router.post("/addTestimonial", async (req, res) => {
  try {
    const savedTestimonial = new TestimonialModel(req.body);
    const createdTestimonial = await savedTestimonial.save();
    if (createdTestimonial._id) {
      res.send(true);
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
