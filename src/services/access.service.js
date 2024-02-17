"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getIntoData } = require("../utils/lodash");
const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { findByEmail } = require("./shop.service");

const RoleShop = {
  SHOP: "0001",
  WRITER: "0002",
  EDITER: "0003",
  ADMIN: "0004",
};

class AccessService {
  static logout = async (data) => {
    const delKey = await KeyTokenService.deleteKeyToken(data._id);
    return {
      code: 2002,
      message: "Logout successfully",
    };
  };

  static login = async ({ email, password, refreshToken = null }) => {
    // Step 1
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new BadRequestError("Email not found");

    // Step 2
    const isMatch = await bcrypt.compare(password, foundShop.password);
    if (!isMatch) throw new AuthFailureError("Authentication failed");

    // Step 3
    const privateKey = await crypto.randomBytes(64).toString("hex");
    const publicKey = await crypto.randomBytes(64).toString("hex");
    const tokens = await createTokenPair(
      { userId: foundShop._id, email: foundShop.email },
      publicKey,
      privateKey
    );
    await KeyTokenService.createKeyToken({
      userId: foundShop._id,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

    // Step 4 : set cookies for refresh token

    return {
      code: 2000,
      shop: getIntoData({
        fileds: ["_id", "name", "email", "status", "verify", "roles"],
        object: foundShop,
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    console.log(`AccessService::signUp:: `, { name, email, password });
    // Step 1: Create a new user
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new BadRequestError("Email already exists");
    }
    // Step 2: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Step 3: Save the user
    const newShop = await shopModel.create({
      name,
      email,
      password: hashedPassword,
      roles: [RoleShop.SHOP],
    });
    // Step 4 : Return the user pub/pri key
    if (newShop) {
      // Step 4.1: Generate key pair
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");
      // Step 4.2: Save the public key
      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });
      if (!keyStore) {
        throw new BadRequestError("Error while creating public key");
      }
      // Step 4.3: Create token pair
      const tokens = await createTokenPair(
        { userId: newShop._id, email: newShop.email },
        publicKey,
        privateKey
      );
      // console.log(`Create token pair:: `, tokens);
      return {
        code: 2001,
        metadata: {
          shop: getIntoData({
            fileds: ["_id", "name", "email", "status", "verify", "roles"],
            object: newShop,
          }),
          tokens,
        },
      };
    }
    return {
      code: "xxxx",
      message: "Error while creating shop",
    };
  };
}

module.exports = AccessService;

// if (newShop) {
//   // Step 4.1: Generate key pair
//   const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
//     modulusLength: 4096,
//     publicKeyEncoding: {
//       type: "spki",
//       format: "pem",
//     },
//     privateKeyEncoding: {
//       type: "pkcs8",
//       format: "pem",
//     },
//   });
//   // Step 4.2: Save the public key
//   const publicKeyString = await KeyTokenService.createKeyToken({
//     userId: newShop._id,
//     publicKey,
//   });
//   if (!publicKeyString) {
//     return {
//       code: "xxxx",
//       message: "Error while creating public key",
//     };
//   }
//   // Step 4.3: Create token pair
//   const publicKeyObject = crypto.createPublicKey(publicKeyString);
//   const tokens = await createTokenPair(
//     { userId: newShop._id, email: newShop.email },
//     publicKeyObject,
//     privateKey
//   );
//   // console.log(`Create token pair:: `, tokens);
//   return {
//     code: 2001,
//     metadata: {
//       shop: getIntoData({
//         fileds: ["_id", "name", "email", "status", "verify", "roles"],
//         object: newShop,
//       }),
//       tokens,
//     },
//   };
// }
