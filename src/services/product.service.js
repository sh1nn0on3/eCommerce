"use strict";

const { product, clothing, electronic } = require("../models/product.model");
const { BadRequestError } = require("../core/error.response");

class ProductFacory {
  static async createProduct(data) {
    const { product_type } = data;
    if (product_type === "Clothing") {
      const newClothing = new Clothing(data);
      return await newClothing.newClothing();
    } else if (product_type === "Electronics") {
      const newElectronic = new Electronic(data);
      return await newElectronic.newElectronic();
    } else {
      throw new BadRequestError("Invalid product type");
    }
  }
}

// define base product class
class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  async createProduct() {
    return await product.create(this);
  }
}

// define base Clothing class
class Clothing extends Product {
  async newClothing() {
    const newClothing = await clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });

    if (!newClothing)
      throw new BadRequestError("Create new Clothing not created");

    const newProduct = await super.createProduct();
    if (!newProduct)
      throw new BadRequestError("Create new Product not created");

    return newProduct;
  }
}

// define base Electronic class
class Electronic extends Product {
  async newElectronic() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronic)
      throw new BadRequestError("Create new Electronic not created");

    const newProduct = await super.createProduct();
    if (!newProduct)
      throw new BadRequestError("Create new Product not created");

    return newProduct;
  }
}

module.exports = ProductFacory;
