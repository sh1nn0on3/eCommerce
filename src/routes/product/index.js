"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const productController = require("../../controllers/product.controller");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();

// Authentication
router.use(authentication);
/////////

// Create product
router.post("/create", asyncHandler(productController.createProduct));

module.exports = router;
