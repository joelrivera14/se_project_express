class ConflictError extends Error {
  constructor(message = "conflict error") {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  ConflictError,
};
