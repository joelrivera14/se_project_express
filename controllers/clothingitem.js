const ClothingItem = require("../models/clothingitem");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

const regularItemError = (req, res, err) => {
  console.error(err);
  if (err.name === "ValidationError" || err.name === "AssertionError") {
    return res.status(ERROR_400).send({
      message: "Invalid data passed for creating or updating an item.",
    });
  } else if (err.name === "CastError") {
    return res.status(ERROR_400).send({
      message: "Invalid ID.",
    });
  }
  return res.status(ERROR_500).send({ message: "An error has occurred" });
};

const findByIdItemError = (req, res, err) => {
  if (
    err.name === "CastError" ||
    err.name === "ValidationError" ||
    err.name === "AssertionError"
  ) {
    return res.status(ERROR_400).send({
      message: "Invalid data passed for creating or updating an item.",
    });
  } else if (err.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({
      message: "Invalid ID.",
    });
  }
  return res.status(ERROR_500).send({ message: "An error has occurred" });
};

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      regularItemError(req, res, e);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      regularItemError(req, res, e);
    });
};

const updateItems = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      regularItemError(req, res, e);
    });
};

const deleteItems = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) => {
      findByIdItemError(req, res, e);
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then(() =>
      res.status(200).send({ message: "Item has successfully been liked" })
    )
    .catch((e) => {
      findByIdItemError(req, res, e);
    });
};
const disLikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      findByIdItemError(req, res, e);
    });
};

module.exports = {
  createItem,
  getItems,
  updateItems,
  deleteItems,
  likeItem,
  disLikeItem,
};
