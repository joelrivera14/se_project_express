const router = require("express").Router();
const clothingItem = require("./clothingitem");
const user = require("./user");
const { ERROR_404 } = require("../utils/errors");
const { loginUser, createUser } = require("../controllers/user");

router.use("/items", clothingItem);
router.use("/users", user);
router.post("/signin", loginUser);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(ERROR_404).send({
    message: "Router not found",
  });
});

module.exports = router;
