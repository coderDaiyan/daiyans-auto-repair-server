const AdminModel = require("../models/admins.model");

const router = require("express").Router();

router.get("/admins", async (req, res) => {
  try {
    const admins = await AdminModel.find({});

    res.status(200).send(admins);
  } catch (e) {
    res.status(400).json({ errror: e.message });
  }
});

router.post("/makeAdmin", async (req, res) => {
  try {
    console.log(req.body);
    const savedAdmin = new AdminModel(req.body);
    const createdAdmin = await savedAdmin.save();

    if (createdAdmin._id) {
      res.send(true);
    }
  } catch (e) {
    res.status(400).json({ errror: e.message });
  }
});

module.exports = router;
