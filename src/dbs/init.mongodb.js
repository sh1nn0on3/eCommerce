"use strict";
const mongoose = require("mongoose");
const {
  db: { host, port, name },
} = require("../configs/config.mongodb");

const { countConnect } = require("../helpers/check.connect");

const mongooseUrl = `mongodb://${host}:${port}/${name}`;
// const mongooseUrl = `mongodb://172.17.0.2:27017`;

class Database {
  constructor() {
    this.connect();
  }
  // Connect to the database
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(mongooseUrl)
      .then(() => {
        countConnect();
        console.log(`Connect : ${mongooseUrl}`);
      })
      .catch((err) => console.error("Could not connect to MongoDB"));
  }
  // Get the instance of the database
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const databaseInstance = Database.getInstance();
module.exports = databaseInstance;
