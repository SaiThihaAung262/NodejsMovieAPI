const createError = require("http-errors");
const { readFileSync } = require("fs");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log(req.get("Authorization"));
    if (!req.get("Authorization")) {
        return next(createError(401));
    }

    const token = req.get("Authorization").split(" ")[1]; //req token

    const secret = readFileSync("./private.key"); // token that we sent

    const decode = jwt.verify(token, secret); // decode jwt token

    try {
        req.user = { _id: decode._id, username: decode.username };
        next();
    } catch (error) {
        next(createError(401));
    }
};