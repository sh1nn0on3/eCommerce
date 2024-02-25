"use strict";

const { SuccessResponse } = require("../core/success.response");
const ProductFacoryV2 = require("../services/product.service.xxx");
// const ProductFacory = require("../services/product.service");

class ProductController {
  // Version 2
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Product created successfully",
      metadata: await ProductFacoryV2.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  publishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Product published successfully",
      metadata: await ProductFacoryV2.publishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  unPublishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Product published successfully",
      metadata: await ProductFacoryV2.unPublishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  searchProducts = async (req, res, next) => {
    new SuccessResponse({
      message: "All publish products",
      metadata: await ProductFacoryV2.searchProducts({
        keySearch: req.params.keySearch,
      }),
    }).send(res);
  };

  // QUERY
  getAllDraftProducts = async (req, res, next) => {
    new SuccessResponse({
      message: "All draft products",
      metadata: await ProductFacoryV2.findAllDraftsForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getAllPublishedProducts = async (req, res, next) => {
    new SuccessResponse({
      message: "All publish products",
      metadata: await ProductFacoryV2.findAllPublishedForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  findAllProducts = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list find all products successfully",
      metadata: await ProductFacoryV2.findAllProducts(req.query),
    }).send(res);
  };

  findProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Get product successfully",
      metadata: await ProductFacoryV2.findProductById({
        product_id: req.params.id,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
