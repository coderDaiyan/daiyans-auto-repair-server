const app = require("./app");
const colors = require("colors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`.yellow.bold);

  mongoose.connect(process.env.MONGODB_CONNECTION_URI, (err) => {
    if (!err) {
      console.log("MongoDB Connected 🛢".green.bold);
    }
  });
});
