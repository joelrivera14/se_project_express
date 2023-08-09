const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItems,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingitem");
const {
  clothingItemValidation,
  idValidation,
} = require("../middlewares/validation");

const { authorization } = require("../middlewares/auth");

// read
router.get("/", getItems);

router.use(authorization);

// create
router.post("/", clothingItemValidation, createItem);

router.put("/:itemId/likes", idValidation, likeItem);

// delete
router.delete("/:itemId", idValidation, deleteItems);
router.delete("/:itemId/likes", idValidation, disLikeItem);

module.exports = router;
