const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { errors } = require("../utils/errors");

const authorization = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || typeof auth !== "string" || !auth.startsWith("Bearer ")) {
    return res
      .status(errors.UNAUTHORIZED)
      .send({ message: "Authorization Error" });
  }
  const token = auth.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return res
      .status(errors.UNAUTHORIZED)
      .send({ message: "Authorization Error" });
  }
  return next();
};

module.exports = {
  authorization,
};
