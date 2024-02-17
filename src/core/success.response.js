"use strict";

const { StatusCode, ReasonStatus } = require("../utils/httpStatus");
// SuccessResponse
class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatus = ReasonStatus.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatus : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

// Custom Success
class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({
    options = {},
    message,
    statusCode = StatusCode.CREATED,
    reasonStatus = ReasonStatus.CREATED,
    metadata,
  }) {
    super({ message, statusCode, reasonStatus, metadata });
    this.options = options;
  }
}

// Export
module.exports = {
  OK,
  CREATED,
  SuccessResponse,
};
