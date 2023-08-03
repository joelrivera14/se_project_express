class NotFoundError extends Error {
  constructor(message = "not found error") {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = {
  NotFoundError,
};
