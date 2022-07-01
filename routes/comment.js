const { Router } = require("express");
const {
  getComment,
  postComment,
  putComment,
  deleteComment,
} = require("../controller");
const { auth } = require("../middlewares");

const router = Router();

router
  .get("/comments", auth, getComment)
  .post("/comment/create", auth, postComment)
  .put("/comment/update", auth, putComment)
  .delete("/comment/delete", auth, deleteComment);

module.exports = router;
