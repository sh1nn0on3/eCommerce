"use strict";

const {
  product,
  clothing,
  electronic,
  furniture,
} = require("../models/product.model");
const { BadRequestError } = require("../core/error.response");
const {
  findAllDraftsForShop,
  publishProductByShop,
  findAllPublishedForShop,
  unPublishProductByShop,
  searchProducts,
  findProductById,
  findAllProducts,
} = require("../models/repositories/product.repo");

class ProductFacory {
  static productRegistry = {};

  static registerProduct(type, Product) {
    ProductFacory.productRegistry[type] = Product;
  }
  static async createProduct(type, payload) {
    const Product = ProductFacory.productRegistry[type];
    if (!Product) throw new BadRequestError(`Invalid product type ${type}`);
    return new Product(payload).createProduct();
  }

  static async searchProducts({ keySearch }) {
    return await searchProducts({ keySearch });
  }

  static async publishProductByShop({ product_id, product_shop }) {
    return await publishProductByShop({ product_id, product_shop });
  }

  static async unPublishProductByShop({ product_id, product_shop }) {
    return await unPublishProductByShop({ product_id, product_shop });
  }

  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true };
    return await findAllDraftsForShop({ query, limit, skip });
  }

  static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isPublished: true };
    return await findAllPublishedForShop({ query, limit, skip });
  }

  static async findProductById({ product_id }) {
    return await findProductById({ product_id, unSelect: ["__v"] });
  }

  static async findAllProducts({
    limit = 50,
    sort = "ctime",
    page = 1,
    filter = { isPublished: true },
  }) {
    return await findAllProducts({
      limit,
      sort,
      filter,
      page,
      select: ["product_name", "product_price", "product_thumb"],
    });
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

  async createProduct(product_id) {
    return await product.create({ ...this, _id: product_id });
  }
}

// define base Clothing class
class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });

    if (!newClothing)
      throw new BadRequestError("Create new Clothing not created");

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct)
      throw new BadRequestError("Create new Product not created");

    return newProduct;
  }
}

// define base Electronic class
class Electronic extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronic)
      throw new BadRequestError("Create new Electronic not created");

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct)
      throw new BadRequestError("Create new Product not created");

    return newProduct;
  }
}

class Furniture extends Product {
  async newFurniture() {
    const newFurniture = await furniture.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newFurniture)
      throw new BadRequestError("Create new Furniture not created");

    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct)
      throw new BadRequestError("Create new Product not created");

    return newProduct;
  }
}

// Register product types
ProductFacory.registerProduct("Clothing", Clothing);
ProductFacory.registerProduct("Electronic", Electronic);
ProductFacory.registerProduct("Furniture", Furniture);

module.exports = ProductFacory;
