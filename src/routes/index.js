"use strict";

const express = require("express");
const { apiKey, checkPermissions } = require("../auth/checkAuth");
const { asyncHandler } = require("../helpers/asyncHandler");
const router = express.Router();
const accessRoutes = require("./access");
const productRoutes = require("./product");




// Check apiKey
router.use(apiKey);
// Check permissions
router.use(checkPermissions("0000"));
// Users
// Access
router.use("/api/v1", accessRoutes);
// Products
router.use("/api/v1/product", productRoutes);

module.exports = router;
