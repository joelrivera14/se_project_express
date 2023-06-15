const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/user");

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
