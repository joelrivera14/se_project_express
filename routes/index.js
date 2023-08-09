const router = require("express").Router();
const clothingItem = require("./clothingitem");
const user = require("./user");
const { NotFoundError } = require("../errors/not-found-error");
const { loginUser, createUser } = require("../controllers/user");
const {
  logInValidation,
  userInfoValidation,
} = require("../middlewares/validation");

router.post("/signin", logInValidation, loginUser);
router.post("/signup", userInfoValidation, createUser);
router.use("/items", clothingItem);
router.use("/users", user);

router.use(() => {
  const error = new NotFoundError("Router not found");
  throw error;
});

module.exports = router;
