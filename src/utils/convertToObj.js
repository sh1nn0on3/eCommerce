const { Types } = require("mongoose");

const convertToObj = (obj) => {
  Types.ObjectId(obj);
};

module.exports = {
  convertToObj,
};
