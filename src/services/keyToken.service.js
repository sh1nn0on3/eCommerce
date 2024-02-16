"use strict";

const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      // const publicKeyString = publicKey.toString();
      const newKeyToken = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });
      return newKeyToken ? newKeyToken.publicKey : null;
    } catch (error) {
      return {
        code: "xxxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = KeyTokenService;
