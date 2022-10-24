const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique."],
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
});

AdminSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    console.log(error);
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
});

const AdminModel = mongoose.model("admins", AdminSchema);
module.exports = AdminModel;
