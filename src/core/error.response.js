"use stract";

const { StatusCode, ReasonStatus } = require("../utils/httpStatus");

// ErrorResponse
class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Custom Errors
class ConflitError extends ErrorResponse {
  constructor(
    message = ReasonStatus.CONFLICT,
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}
class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatus.BAD_REQUEST,
    statusCode = StatusCode.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = ReasonStatus.UNAUTHORIZED,
    statusCode = StatusCode.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  ConflitError,
  BadRequestError,
  AuthFailureError,
};
