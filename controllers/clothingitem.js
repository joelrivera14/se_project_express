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

module.exports = {
  createItem,
  getItems,
};
