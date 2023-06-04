const User = require("../models/user");

const getUser = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      res.status(500).send({ message: "error from  getUserId", e });
    });
};

const getUserId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      res.status(500).send({ message: "error from  getUserId", e });
    });
};

const createUser = (req, res) => {
  console.log(req);
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      res.status(500).send({ message: "error from  createUser", e });
    });
};

module.exports = {
  getUser,
  getUserId,
  createUser,
};
