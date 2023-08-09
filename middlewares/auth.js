const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../errors/unauthorized-error");

const authorization = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || typeof auth !== "string" || !auth.startsWith("Bearer ")) {
    const error = new UnauthorizedError("Authorization Error");
    throw error;
  }
  const token = auth.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    const error = new UnauthorizedError("Authorization Error");
    throw error;
  }
  return next();
};

module.exports = {
  authorization,
};
