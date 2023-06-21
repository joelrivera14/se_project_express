const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/user");
const { authorization } = require("../middlewares/auth");

router.use(authorization);

// // get
// router.get("/", getUser);

// // getID
// router.get("/:userId", getUserId);

// // create
// router.post("/", createUser);

// getCurrentUser
router.get("/me", getCurrentUser);

// update
router.patch("/me", updateUser);

module.exports = router;
