"use strict";

const { SuccessResponse } = require("../core/success.response");
const ProductFacory = require("../services/product.service");

class ProductController {
  createProduct = async (req, res, next) => {
    console.log("🚀 ~ ProductController ~ createProduct= ~ req:", req.body);
    const metadata = await ProductFacory.createProduct(req.body);
    console.log(
      "🚀 ~ ProductController ~ createProduct= ~ metadata:",
      metadata
    );
    new SuccessResponse({
      message: "Product created successfully",
      metadata: metadata,
    }).send(res);
  };
}

module.exports = new ProductController();
