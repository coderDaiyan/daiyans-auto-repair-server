const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  orderData: {
    name: String,
    email: {
      type: String,
      required: true,
      validation: {
        validator: (data) => {
          const isEmail = data.match(/^\S+@\S+\.\S+$/);
          if (isEmail) {
            return true;
          }
          return false;
        },
        message: "Please give a correct mail",
      },
    },
    service: {
      type: String,
      ref: "services",
      required: true,
    },
    notes: String,
  },
  isAdmin: {
    type: Boolean,
    ref: "admins",
    default: false,
  },
  paymentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

OrderSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    console.log(error);
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
});

const OrderModel = mongoose.model("orders", OrderSchema);
module.exports = OrderModel;
