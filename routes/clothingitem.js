const router = require("express").Router();
const {
  createItem,
  getItems,
  updateItems,
  deleteItems,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingitem");

const { authorization } = require("../middlewares/auth");

router.use(authorization);

// create
router.post("/", createItem);

// read
router.get("/", getItems);

// update
router.put("/:itemId", updateItems);
router.put("/:itemId/likes", likeItem);

// delete
router.delete("/:itemId", deleteItems);
router.delete("/:itemId/likes", disLikeItem);

module.exports = router;
