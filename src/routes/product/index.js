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
router.put("/publish/:id",asyncHandler(productController.publishProductByShop));
router.put("/unpublish/:id",asyncHandler(productController.unPublishProductByShop));

// UPDATE //
router.patch("/update/:id",asyncHandler(productController.updateProduct));

// QUERY //
router.get("/all",asyncHandler(productController.findAllProducts));
router.get("/drafts/all", asyncHandler(productController.getAllDraftProducts));
router.get("/published/all",asyncHandler(productController.getAllPublishedProducts));

// SEARCH
router.put("/search/:keySearch",asyncHandler(productController.searchProducts)
);

module.exports = router;
