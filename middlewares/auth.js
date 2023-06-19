const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { errors } = require("../utils/errors");

authorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (
    !authorization ||
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    const err = new Error("Authorization Error");
    err.status = errors.UNAUTHORIZED;
    err.name = "Unauthorized";
    throw err;
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
};

module.exports = {
  authorization,
};