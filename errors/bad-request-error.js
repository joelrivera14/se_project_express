class BadRequestError extends Error {
  constructor(message = "bad request") {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = { BadRequestError };
