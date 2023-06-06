const router = require("express").Router();
const clothingItem = require("./clothingitem");
const user = require("./user");
const { ERROR_404 } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/user", user);

router.use((req, res) => {
  res.status(ERROR_404).send({
    message: "Router not found",
  });
});

module.exports = router;
