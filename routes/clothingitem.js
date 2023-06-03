const router = require("express").Router();

const { createItem, getItems } = require("../controllers/clothingitem");

//crud

//create
router.post("/", createItem);

//read
router.get("/", getItems);

//update

//delete

module.exports = router;
