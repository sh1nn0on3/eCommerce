"use strict";

const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // Access token
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: "2d",
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: "7d",
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) throw new Error("Invalid token");
      console.log(`Decode verify:: `, decode);
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return {
      code: "xxxx",
      message: "Error while creating token pair",
      status: "error",
    };
  }
};

module.exports = {
  createTokenPair,
};
