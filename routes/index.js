const router = require("express").Router();
const clothingItem = require("./clothingitem");
const user = require("./user");
const { errors } = require("../utils/errors");
const { loginUser, createUser } = require("../controllers/user");

router.post("/signin", loginUser);
router.post("/signup", createUser);
router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  res.status(errors.NOT_FOUND).send({
    message: "Router not found",
  });
});

module.exports = router;
