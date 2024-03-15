"use strict";

const mongoose = require("mongoose");

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

const apikeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ["0000", "1111", "2222"],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, apikeySchema);
