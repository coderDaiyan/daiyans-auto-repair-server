const ServiceModel = require("../models/services.model");

const router = require("express").Router();

router.get("/services", async (req, res) => {
  try {
    // console.log("boo");
    const services = await ServiceModel.find({});
    res.status(200).send(services);
  } catch (e) {
    res.status(400).json({ errror: e.message });
  }
});

router.post("/addService", async (req, res) => {
  try {
    const savedService = new ServiceModel(req.body);
    const createdService = await savedService.save();
    if (createdService._id) {
      res.send(true);
    }
  } catch (e) {
    res.status(400).json({ errror: e.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    if (req.params.id) {
      await ServiceModel.deleteOne({ _id: req.body.id });
      res.send("Deleted");
    } else {
      throw new Error("Please give the correct ID");
    }
  } catch (e) {}
});

module.exports = router;
