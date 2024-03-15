"use strict";

const { min } = require("lodash");
const { Schema, model } = require("mongoose");
const slugify = require("slugify");
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: { type: String, required: true },
    product_slug: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Furniture"],
    },
    product_shop: String,
    product_attributes: { type: Schema.Types.Mixed, required: true },
    product_ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: { type: Array, default: [] },
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
// Create index for product_name
productSchema.index({ product_name: "text", product_description: "text" });
// Document middleware
productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

// define the product type = Electronics
const electronicSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    product_shop: { type: Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    timestamps: true,
    collection: "Electronics",
  }
);

// define the product type = Clothing
const clothingSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    material: { type: String, required: true },
    product_shop: { type: Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    timestamps: true,
    collection: "Clothes",
  }
);

const furnitureSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    product_shop: { type: Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    timestamps: true,
    collection: "Furniture",
  }
);

// define the product type = Furniture

module.exports = {
  product: model(DOCUMENT_NAME, productSchema),
  electronic: model("Electronic", electronicSchema),
  clothing: model("Clothing", clothingSchema),
  furniture: model("Furniture ::", furnitureSchema),
};
