"use strict";

const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
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
}

module.exports = new AccessController();
