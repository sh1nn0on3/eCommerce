"use strict";

const { BadRequestError } = require("../core/error.response");
const discountModel = require("../models/discount.model");
const {
  findAllDiscountCodeUnSelect,
} = require("../models/repositories/discount.repo");
const { findAllProducts } = require("../models/repositories/product.repo");
const { convertToObj } = require("../utils/convertToObj");

/*
    Discount Service
    1 - Generate discount Code [ Shop | Admin ]
    2 - Get discount amount [ User]
    3 - Get all discount code [User | Shop ]
    4 - Verify discount code [ User ]
    5 - Delete discount code [ Shop | Admin ]
    6 - Cancel discount code [ Shop | Admin ]
*/

class DiscountService {
  static async createDiscountCode(payload) {
    const {
      name,
      desciption,
      type,
      value,
      start_date,
      end_date,
      max_uses,
      users_count,
      max_user_per_user,
      min_order_value,
      shop_id,
      applies_to,
      product_ids,
    } = payload;
    // middleware to check
    if (
      new Date() < new Date(start_date) ||
      new Date() > new Date(end_date) ||
      new Date(start_date) > new Date(end_date)
    ) {
      throw new BadRequestError("Discount date is not valid");
    }

    // create discount code
    const foundDiscount = await DiscountModel.findOne({
      discount_code: code,
      discount_shopId: convertToObj(shop_id),
    }).lean();

    if (foundDiscount && foundDiscount.discount_is_active) {
      throw new BadRequestError("Discount code already exists");
    }

    const newDiscount = await discountModel.create({
      discount_name: name,
      discount_description: desciption,
      discount_type:
        type === "percent" ? ["percentage_amount"] : ["fixed_amount"],
      discount_value: value,
      discount_code: code,
      discount_startDate: new Date(start_date),
      discount_endDate: new Date(end_date),
      discount_max_uses: max_uses,
      discount_users_count: users_count,
      discount_user_used: users_used,
      discount_max_user_per_user: max_user_per_user,
      discount_min_order_value: min_order_value || 0,
      discount_shopId: convertToObj(shop_id),
      discount_is_active: true,
      discount_applies_to: applies_to,
      discount_product_ids: product_ids === "all" ? [] : product_ids,
    });
    return newDiscount;
  }

  static async updateDiscountCode() {
    // ...
  }

  static async getAllDiscountCode({ code, shopId, userId, limit, page }) {
    const foundDiscount = await discountModel
      .findOne({
        discount_code: code,
        discount_shopId: convertToObj(shopId),
      })
      .lean();
    if (!foundDiscount || !foundDiscount.discount_is_active) {
      throw new BadRequestError("Discount code not found");
    }
    const { discount_applies_to, discount_product_ids } = foundDiscount;
    let products;
    if (discount_applies_to === "all") {
      // Get All Product
      products = await findAllProducts({
        filter: { product_shop: convertToObj(shopId), isPublished: true },
        limit: +limit,
        page: +page,
        sort: "ctime",
        select: ["product_name"],
      });
    }
    if (discount_applies_to === "specific") {
      // Get Specific Product
      products = await findAllProducts({
        filter: { _id: { $in: discount_product_ids }, isPublished: true },
        limit: +limit,
        page: +page,
        sort: "ctime",
        select: ["product_name"],
      });
    }
    return products;
  }

  static async getAllDiscountCodeByShop({ shopId, limit, page }) {
    const foundDiscount = findAllDiscountCodeUnSelect({
      limit: +limit,
      page: +page,
      filter: {
        discount_shopId: convertToObj(shopId),
        discount_is_active: true,
      },
      unSelect: ["__v", "discount_shopId", "discount_is_active"],
      model: Discount,
    });
    return foundDiscount;
  }
}
