const { Router } = require("express");
const { postComment } = require("../controller");
const { auth } = require("../middlewares");

const router = Router();

router.post("/comment/create", auth, postComment);

module.exports = router;