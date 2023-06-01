const router = require("express").Router();

const { createItem } = require("../controllers/clothingitem");

//crud

//create
router.post("/", createItem);

module.exports = router;
