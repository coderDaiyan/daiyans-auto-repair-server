const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7ppa7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

client.connect((err) => {
  console.log(err);

  const servicesCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection("services");

  const testimonialCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection("testimonial");

  const ordersCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection("orders");

  const adminsCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection("admins");

  const slidersCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection("sliders");

  app.post("/addService", (req, res) => {
    const service = req.body;
    servicesCollection.insertOne(service).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/services", (req, res) => {
    servicesCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.post("/addTestimonial", (req, res) => {
    const testimonials = req.body;
    testimonialCollection.insertMany(testimonials).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/testimonials", (req, res) => {
    testimonialCollection.find({}).toArray((err, testimonials) => {
      res.send(testimonials);
    });
  });

  app.post("/placeOrder", (req, res) => {
    const order = req.body;
    ordersCollection.insertOne(order).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/orders", (req, res) => {
    ordersCollection.find({ email: req.query.email }).toArray((err, orders) => {
      res.send(orders);
    });
  });

  app.get("/allOrders", (req, res) => {
    ordersCollection.find({}).toArray((err, allOrders) => {
      res.send(allOrders);
    });
  });

  app.post("/addReview", (req, res) => {
    const review = req.body;
    testimonialCollection.insertOne(review).then((result) => {
      res.send(result.insertedCount > 0);
      console.log("review added");
    });
  });

  app.post("/makeAdmin", (req, res) => {
    const admin = req.body;
    adminsCollection.insertOne(admin).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/admins", (req, res) => {
    adminsCollection.find({}).toArray((err, admins) => {
      res.send(admins);
    });
  });

  app.post("/addService", (req, res) => {
    const service = req.body;
    servicesCollection.insertOne(service).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/services", (req, res) => {
    servicesCollection.find({}).toArray((err, services) => {
      res.send(services);
    });
  });

  app.get("/specificOrder/:id", (req, res) => {
    ordersCollection
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, order) => {
        res.send(order);
      });
  });

  app.patch("/updateStatus", (req, res) => {
    const { id, status } = req.body;
    ordersCollection
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: { status: status },
        }
      )
      .then((result) => res.send(result.modifiedCount > 0));
  });

  app.delete("/delete/:id", (req, res) => {
    servicesCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.send(result.deletedCount > 0);
        console.log("deleted");
      });
  });

  console.log("db connected");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
