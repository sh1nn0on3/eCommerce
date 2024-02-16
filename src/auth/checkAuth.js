"use strict";

const { findById } = require("../services/apikey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({ message: "Forbidden Error 1" });
    }
    // check object
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({ message: "Forbidden Error 2" });
    }
    req.objKey = objKey;
    return next();
  } catch (error) {
    console.log("Error: ", error);
  }
};

const checkPermissions = (permissions) => {
  return (req, res, next) => {
    const { objKey } = req;
    if (!objKey.permissions.includes(permissions)) {
      return res.status(403).json({ message: "Forbidden Error 3" });
    }
    return next();
  };
};

module.exports = { apiKey, checkPermissions };
