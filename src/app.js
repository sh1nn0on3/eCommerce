require("dotenv").config();
const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

// Init middlewares
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(cookieParser());

// Init db
require("./dbs/init.mongodb");
const { countConnect, checkOverLoad } = require("./helpers/check.connect");
// checkOverLoad();

// Document Api
const { swaggerSpec, swaggerUi } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Init routes
app.use("/", require("./routes"));

// Init error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  return res.status(status).json({
    status: "error",
    code: status,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
