class ForbiddenError extends Error {
  constructor(message = "forbidden error") {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = {
  ForbiddenError,
};
