class UnauthorizedError extends Error {
  constructor(message = "conflict error") {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = {
  UnauthorizedError,
};
