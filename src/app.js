require("dotenv").config();
const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

// Init middlewares
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// Init db
require("./dbs/init.mongodb");
const { countConnect, checkOverLoad } = require("./helpers/check.connect");
// checkOverLoad();

// Init routes
app.use("/", require("./routes"));

// Init error handling

module.exports = app;
