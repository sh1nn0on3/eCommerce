"use strict";

const express = require("express");
const { apiKey, checkPermissions } = require("../auth/checkAuth");
const accessController = require("../controllers/access.controller");
const { asyncHandler } = require("../auth/checkHandlerError");
const router = express.Router();

// Check apiKey
router.use(apiKey);
// Check permissions
router.use(checkPermissions("0000"));

// Users
// Access
router.use("/api/v1", asyncHandler(accessController.signUp));

module.exports = router;
