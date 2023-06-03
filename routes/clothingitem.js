const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItems,
} = require("../controllers/clothingitem");

//crud

//create
router.post("/", createItem);

//read
router.get("/", getItems);

//update
router.put("/:itemId", updateItems);

//delete

module.exports = router;
