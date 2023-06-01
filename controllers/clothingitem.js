const ClothingItem = require("../models/clothingitem");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "error from  createItem", e });
    });
};

module.exports = {
  createItem,
};
