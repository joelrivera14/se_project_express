const User = require("../models/user");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

const regularItemError = (req, res, err) => {
  if (err.name === "ValidationError") {
    return res.status(ERROR_400).send({
      message: "Invalid data passed for creating or updating a user.",
    });
  }
  if (err.name === "CastError") {
    return res.status(ERROR_400).send({
      message: "Invalid ID.",
    });
  }
  return res.status(ERROR_500).send({ message: "An error has occurred" });
};

const findByIdItemError = (req, res, err) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    return res.status(ERROR_400).send({
      message: "Invalid data passed for creating or updating a user.",
    });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({
      message: "Invalid ID.",
    });
  }
  return res.status(ERROR_500).send({ message: "An error has occurred" });
};

const getUser = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      regularItemError(req, res, e);
    });
};

const getUserId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      findByIdItemError(req, res, e);
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      regularItemError(req, res, e);
    });
};

module.exports = {
  getUser,
  getUserId,
  createUser,
};
