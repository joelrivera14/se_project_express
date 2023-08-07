const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { errors } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const { ConflictError } = require("../errors/conflict-error");

const getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      next(e);
    });
};

const getUserId = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      next(e);
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((previousUser) => {
      if (previousUser) {
        const error = new ConflictError("this is a duplicate");
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      res.send({
        data: { name: user.name, avatar: user.avatar, email: user.email },
      });
    })
    .catch((e) => {
      next(e);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((e) => {
      next(e);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ user }))
    .catch((e) => next(e));
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const update = { name, avatar };

  User.findOneAndUpdate({ _id: req.user._id }, update, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(errors.NOT_FOUND).send({ message: "User not found" });
      }
      return res.send({
        data: { user, message: "Username updated successfully" },
      });
    })
    .catch((e) => {
      next(e);
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

// const regularItemError = (req, res, err) => {
//   console.error(err);
//   if (err.name === "ValidationError") {
//     return res.status(errors.BAD_REQUEST).send({
//       message: "Invalid data passed for creating or updating a user.",
//     });
//   }
//   if (err.name === "CastError") {
//     return res.status(errors.BAD_REQUEST).send({
//       message: "Invalid ID.",
//     });
//   }
//   return res
//     .status(errors.SERVER_ERROR)
//     .send({ message: "An error has occurred" });
// };

// const findByIdItemError = (req, res, err) => {
//   if (err.name === "CastError" || err.name === "ValidationError") {
//     return res.status(errors.BAD_REQUEST).send({
//       message: "Invalid data passed for creating or updating a user.",
//     });
//   }
//   if (err.name === "DocumentNotFoundError") {
//     return res.status(errors.NOT_FOUND).send({
//       message: "Invalid ID.",
//     });
//   }
//   return res
//     .status(errors.SERVER_ERROR)
//     .send({ message: "An error has occurred" });
// };
