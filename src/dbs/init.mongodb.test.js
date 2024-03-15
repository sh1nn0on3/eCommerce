"use strict";
const mongoose = require("mongoose");

const mongooseUrl = "mongodb://localhost:27018/shopDev";

mongoose
  .connect(mongooseUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB"));

if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
