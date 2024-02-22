"use strict";

const JWT = require("jsonwebtoken");
const { asyncHandler } = require("../helpers/asyncHandler");
const { BadRequestError } = require("../core/error.response");
const { findByUserId } = require("../services/keyToken.service");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "athorization",
};

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

const authentication = asyncHandler(async (req, res, next) => {
  const user = req.headers[HEADER.CLIENT_ID];
  if (!user) return res.status(403).json({ message: "Forbidden Error 1" });
  const keyToken = await findByUserId({ user });
  if (!keyToken) return res.status(403).json({ message: "Forbidden Error 2" });

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken)
    return res.status(403).json({ message: "Forbidden Error 3" });

  try {
    const decode = JWT.verify(accessToken, keyToken.publicKey);
    if (user !== decode.userId)
      return res.status(403).json({ message: "Forbidden Error 4" });
    req.keyToken = keyToken;
    req.user = decode;
    return next();
  } catch (error) {
    throw new BadRequestError("Unauthorized 5");
  }
});

module.exports = {
  createTokenPair,
  authentication,
};
