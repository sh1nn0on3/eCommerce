"use strict";

const express = require("express");
const router = express.Router();

// Access
router.use("/api/v1", require("./access"));

module.exports = router;
