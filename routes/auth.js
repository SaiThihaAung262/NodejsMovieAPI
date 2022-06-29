const { Router } = require("express");
const { postLogin, postRegister } = require("../controller");

const router = Router();

router.post("/register", postRegister).post("/login", postLogin);

module.exports = router;