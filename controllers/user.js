const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { ERROR_400, ERROR_404, ERROR_500, errors } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

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
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((previousUser) => {
      if (previousUser) {
        const userError = new Error("Email already exist");
        userError.status = errors.DUPLICATE;
        userError.name = "Duplicate";
        throw userError;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      return User.create({ name, avatar, email, password: hash });
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      console.log(e);
      regularItemError(req, res, e);
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((e) => {
      findByIdItemError(req, res, e);
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ user }))
    .catch((e) => findByIdItemError(req, res, e));
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const update = { name, avatar };

  User.findOneAndUpdate({ _id: req.user._id }, update, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        const err = new Error("User not found");
        err.status = errors.NOT_FOUND;
        err.name = "NotFound";
        throw err;
      }
      res.send({ data: { user, message: "Username updated successfully" } });
    })
    .catch((e) => {
      regularItemError(req, res, e);
    });
};

module.exports = {
  getUser,
  getUserId,
  createUser,
  loginUser,
  getCurrentUser,
  updateUser,
};
