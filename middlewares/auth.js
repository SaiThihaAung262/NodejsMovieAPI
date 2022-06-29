const createError = require("http-errors");
const { readFileSync } = require("fs");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (!req.get("Authorization")) {
        return next(createError(401));
    }
    const token = req.get("Authorization").split(" ")[1]; //req token
    const secret = readFileSync("./private.key"); // token that we sent

    try {
        const decode = jwt.verify(token, secret); // verify token
        req.user = { _id: decode._id, username: decode.username };
        next();
    } catch (error) {
        next(createError(401));
    }
};