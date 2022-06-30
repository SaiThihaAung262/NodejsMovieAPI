const { Router } = require("express");
const { postComment, putComment, deleteComment } = require("../controller");
const { auth } = require("../middlewares");

const router = Router();

router
    .post("/comment/create", auth, postComment)
    .put("/comment/update", auth, putComment)
    .delete("/comment/delete", auth, deleteComment);

module.exports = router;