"use strict";

const express = require("express");
const { apiKey, checkPermissions } = require("../auth/checkAuth");
const accessRoutes = require("./access");
const { asyncHandler } = require("../helpers/asyncHandler");
const router = express.Router();

// Check apiKey
router.use(apiKey);
// Check permissions
router.use(checkPermissions("0000"));
// Users
// Access
router.use("/api/v1", accessRoutes);

module.exports = router;
