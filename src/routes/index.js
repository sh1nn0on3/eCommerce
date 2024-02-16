"use strict";

const express = require("express");
const { apiKey, checkPermissions } = require("../auth/checkAuth");
const router = express.Router();

// Check apiKey
router.use(apiKey);
// Check permissions
router.use(checkPermissions("0000"));
// Access
router.use("/api/v1", require("./access"));

module.exports = router;
