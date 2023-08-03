const ClothingItem = require("../models/clothingitem");
const { errors } = require("../utils/errors");
const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ForbiddenError = require("../errors/forbidden-error");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      next(e);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      // regularItemError(req, res, e);
      next(e);
    });
};

const updateItems = (req, res, next) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      // regularItemError(req, res, e);
      next(e);
    });
};

const deleteItems = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res
          .status(errors.FORBIDDEN)
          .send({ message: "You are not authorized to delete this item" });
      }
      return item.deleteOne().then(() => {
        res.send({ message: "Item removed" });
      });
    })
    .catch((e) => {
      // findByIdItemError(req, res, e);
      next(e);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then(
      (item) => {
        res.send({ data: item });
      }
      // res
      // .status(200)
      // .send({ message: "Item has successfully been liked", ...data })
    )
    .catch((e) => {
      // findByIdItemError(req, res, e);
      next(e);
    });
};
const disLikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      // findByIdItemError(req, res, e);
      next(e);
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

// const regularItemError = (req, res, err) => {
//   console.error(err);
//   if (err.name === "ValidationError") {
//     return res.status(errors.BAD_REQUEST).send({
//       message: "Invalid data passed for creating or updating an item.",
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
//       message: "Invalid data passed for creating or updating an item.",
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
