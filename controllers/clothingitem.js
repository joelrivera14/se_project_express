const ClothingItem = require("../models/clothingitem");

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "error from  createItem", e });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "error from  getItems", e });
    });
};

const updateItems = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: "error from  updateItems", e });
    });
};

const deleteItems = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) => {
      res.status(500).send({ message: "error from  deleteItems", e });
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
      res.status(500).send({ message: "error from  likeItem", e });
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
      res.status(500).send({ message: "error from  dislikeItem", e });
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
