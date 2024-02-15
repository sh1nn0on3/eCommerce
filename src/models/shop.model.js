"use strict";
// Key !dmbg install by MongoDB Snippets

const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";

const shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true, // remove whitespace
      maxLength: 100,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, collation: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, shopSchema, COLLECTION_NAME);
