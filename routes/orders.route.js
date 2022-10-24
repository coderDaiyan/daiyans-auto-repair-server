const OrderModel = require("../models/orders.model");

const router = require("express").Router();

router.post("/placeOrder", async (req, res) => {
  const result = await OrderModel.create(req.body);

  if (result) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get("/orders", async (req, res) => {
  const result = await OrderModel.find({ email: req.query.email });
  if (result) {
    res.send(result);
  }
});

router.get("/allOrders", async (req, res) => {
  const result = await OrderModel.find({});
  if (result) {
    res.send(result);
  }
});

module.exports = router;
