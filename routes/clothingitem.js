const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItems,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingitem");

const { authorization } = require("../middlewares/auth");

// read
router.get("/", getItems);

router.use(authorization);

// create
router.post("/", createItem);

router.put("/:itemId/likes", likeItem);

// delete
router.delete("/:itemId", deleteItems);
router.delete("/:itemId/likes", disLikeItem);

module.exports = router;
