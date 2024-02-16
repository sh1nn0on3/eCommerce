"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getIntoData } = require("../utils/lodash");

const RoleShop = {
  SHOP: "0001",
  WRITER: "0002",
  EDITER: "0003",
  ADMIN: "0004",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // Step 1: Create a new user
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "xxxx",
          message: "Shop already registered",
        };
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
          return {
            code: "xxxx",
            message: "Error while creating public key",
          };
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
    } catch (error) {
      return {
        code: "xxxx",
        message: "Error while creating shop",
        status: "error",
      };
    }
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
