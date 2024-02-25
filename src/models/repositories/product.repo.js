"use strict";

const { Types } = require("mongoose");
const {
  product,
  electronic,
  clothing,
  furniture,
} = require("../../models/product.model");
const { getSelectData, unGetSelectData } = require("../../utils/getSelectData");

const publishProductByShop = async ({ product_id, product_shop }) => {
  const foundProduct = await product.findOneAndUpdate(
    {
      product_shop: product_shop,
      _id: Types.ObjectId(product_id),
    },
    { isDraft: false, isPublished: true },
    { new: true }
  );
  if (!foundProduct) return null;
  return foundProduct;
};

const unPublishProductByShop = async ({ product_id, product_shop }) => {
  const foundProduct = await product.findOneAndUpdate(
    {
      product_shop: product_shop,
      _id: Types.ObjectId(product_id),
    },
    { isDraft: true, isPublished: false },
    { new: true }
  );
  if (!foundProduct) return null;
  return foundProduct;
};

const searchProducts = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch);
  const results = await product
    .find(
      { isPublished: true, $text: { $search: regexSearch } },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .lean()
    .exec();
  return results;
};

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await FindAll({ query, limit, skip });
};

const findAllPublishedForShop = async ({ query, limit, skip }) => {
  return await FindAll({ query, limit, skip });
};

const findProductById = async ({ product_id, unSelect }) => {
  return await product
    .findById(product_id)
    .select(unGetSelectData(unSelect))
    .lean()
    .exec();
};

const findAllProducts = async ({ limit, sort, filter, page, select }) => {
  const skip = (page - 1) * limit;
  const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
  return await product
    .find(filter)
    .sort(sortBy)
    .limit(limit)
    .skip(skip)
    .select(getSelectData(select))
    .lean()
    .exec();
};

const FindAll = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate("product_shop", "name email -_id")
    .limit(limit)
    .skip(skip)
    .lean()
    .exec();
};

module.exports = {
  findAllDraftsForShop,
  publishProductByShop,
  findAllPublishedForShop,
  unPublishProductByShop,
  searchProducts,
  findProductById,
  findAllProducts,
};
