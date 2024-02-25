const inventory = require("../../models/inventory.model");

const insertInventory = async ({
  product_id,
  shop_id,
  stock,
  location = "unknow",
}) => {
  const newInventory = await inventory.create({
    inven_productId: product_id,
    inven_loactionId: location,
    inven_stock: stock,
    inven_shopId: shop_id,
  });
  if (!newInventory) return "Create new Inventory not created";
  return await newInventory.save();
};

module.exports = {
  insertInventory,
};
