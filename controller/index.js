const { postLogin } = require("./auth/loginController");
const { postRegister } = require("./auth/registerController");
const { getMovies } = require("./movieController");

module.exports = {
    postLogin,
    postRegister,
    getMovies,
};