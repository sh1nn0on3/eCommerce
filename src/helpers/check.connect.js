"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECOND = 5000;

// Count Connect
const countConnect = () => {
  const numConnect = mongoose.connections.length;
  console.log("Number of connections: ", numConnect);
  return numConnect;
};

// Check overload
const checkOverLoad = () => {
  setInterval(() => {
    const numConnect = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss / 1024 / 1024;

    console.log("Number of connections: ", numConnect);
    console.log("Memory usage: ", memoryUsage, "MB");

    if (numConnect > numCores) {
      console.log("Overload detected");
    }
  }, _SECOND); // Monitor every 5 seconds
};

module.exports = { countConnect, checkOverLoad };
