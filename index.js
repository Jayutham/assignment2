const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("./routes/routes");

const db = mongoose.connection;

mongoose.connect("mongodb://localhost/Marketplace", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello Everyone welcome to my marketplace!");
});

app.listen(3000);
