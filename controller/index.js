const { postLogin } = require("./auth/loginController");
const { postRegister } = require("./auth/registerController");
const { getMovies } = require("./movieController");
const { postComment } = require("./commentController");

module.exports = {
    postLogin,
    postRegister,
    getMovies,
    postComment,
};