const { Router } = require("express");
const { getMovies } = require("../controller");
const { auth } = require("../middlewares");

const router = Router();

router.get("/movies", auth, getMovies);

module.exports = router;