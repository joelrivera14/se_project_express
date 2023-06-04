const router = require("express").Router();
const clothingItem = require("./clothingitem");
const user = require("./user");

router.use("/items", clothingItem);
router.use("/user", user);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
