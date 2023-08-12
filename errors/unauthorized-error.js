class UnauthorizedError extends Error {
  constructor(message = "conflict error") {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = {
  UnauthorizedError,
};

// # Run this locally from the front-end folder
// scp -r -i path/to/ssh/key ./build/* jorivera114@weatherwear.crabdance.com:/home/jorivera114/frontend
