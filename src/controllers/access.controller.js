"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  login = async (req, res, next) => {
    const metadata = await AccessService.login(req.body);
    res.cookie("refreshToken", metadata.tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    new SuccessResponse({
      message: "Login successfully",
      metadata: metadata,
    }).send(res);
  };

  signUp = async (req, res, next) => {
    /*
            200 OK
            201 CREATED    
      */
    // return res.status(201).json(await AccessService.signUp(req.body));
    new CREATED({
      message: "User created",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    res.clearCookie("refreshToken");
    console.log("🚀 ~ AccessController ~ logout= ~ req:", req.keyToken);
    const metadata = await AccessService.logout(req.keyToken);
    new SuccessResponse({
      message: "Logout successfully",
      metadata: metadata,
    }).send(res);
  };
}

module.exports = new AccessController();
