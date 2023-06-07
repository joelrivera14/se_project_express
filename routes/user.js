const router = require("express").Router();
const { getUser, getUserId, createUser } = require("../controllers/user");

// get
router.get("/", getUser);

// getID
router.get("/:userId", getUserId);

// create
router.post("/", createUser);

module.exports = router;
