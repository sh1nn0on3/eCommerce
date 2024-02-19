"use strict";

const {
  Types: { ObjectId },
} = require("mongoose");
const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      // const publicKeyString = publicKey.toString();
      // const newKeyToken = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // });
      // return newKeyToken ? newKeyToken.publicKey : null;

      const filter = { user: userId };
      const update = {
        publicKey,
        privateKey,
        refreshTokenUsed: [],
        refreshToken,
      };
      const options = { upsert: true, new: true };
      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return {
        code: "xxxx",
        message: error.message,
        status: "error",
      };
    }
  };
  static findByUserId = async ({ user }) => {
    return await keyTokenModel.findOne({ user: ObjectId(user) }).lean();
  };

  static deleteKeyToken = async (id) => {
    return await keyTokenModel.findByIdAndDelete(id);
  };
}

module.exports = KeyTokenService;
