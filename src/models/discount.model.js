"use strict";
const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";

const discountSchema = new Schema(
  {
    discount_name: { type: String, required: true },
    discount_description: { type: String, required: true },
    discount_type: {type: Array,required: true,enum: ["fixed_amount", "percentage_amount"],},
    discount_value: { type: Number, required: true },
    discount_code: { type: String, required: true },
    discount_startDate: { type: Date, required: true },
    discount_endDate: { type: Date, required: true },
    discount_max_uses: { type: Number, required: true },
    discount_users_count: { type: Number, required: true },
    discount_user_used: { type: Array, default: [] },
    discount_max_user_per_user: { type: Number, required: true },
    discount_min_order_value: { type: Number, required: true },
    discount_shopId: { type: Schema.Types.ObjectId, ref: "Shop" },

    discount_is_active: { type: Boolean, default: true },
    discount_applies_to: { type: String, required: true, enum: ["all", "specific"],},
    discount_product_ids: { type: Array, default: [] },
  },
  {
    timestamps: true,
    collation: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, discountSchema);
