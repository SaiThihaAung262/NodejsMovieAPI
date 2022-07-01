const { postLogin } = require("./auth/loginController");
const { postRegister } = require("./auth/registerController");
const { getMovies } = require("./movieController");
const {
  postComment,
  putComment,
  deleteComment,
  getComment,
} = require("./commentController");

module.exports = {
  postLogin,
  postRegister,
  getMovies,
  postComment,
  putComment,
  deleteComment,
  getComment,
};
