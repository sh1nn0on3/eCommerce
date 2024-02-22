"use strict";

const { SuccessResponse } = require("../core/success.response");
const ProductFacory = require("../services/product.service");
const ProductFacoryV2 = require("../services/product.service.xxx");

class ProductController {
  // Version 1
  // createProduct = async (req, res, next) => {
  //   const metadata = await ProductFacory.createProduct({
  //     ...req.body,
  //     product_shop: req.user.userId,
  //   });
  //   // Send success response
  //   new SuccessResponse({
  //     message: "Product created successfully",
  //     metadata: metadata,
  //   }).send(res);
  // };

  // Version 2
  createProduct = async (req, res, next) => {
    const metadata = await ProductFacoryV2.createProduct(
      req.body.product_type,
      {
        ...req.body,
        product_shop: req.user.userId,
      }
    );
    // Send success response
    new SuccessResponse({
      message: "Product created successfully",
      metadata: metadata,
    }).send(res);
  };
}

module.exports = new ProductController();
