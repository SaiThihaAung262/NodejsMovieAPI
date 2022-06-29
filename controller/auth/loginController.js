const { User } = require("../../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { readFileSync } = require("fs");

const postLogin = (req, res, next) => {
    User.loigin(req.body)
        .then((result) => {
            if (result instanceof Error) {
                return next(result);
            }

            //Read secret key form private.key file
            const secret = readFileSync("./private.key");

            //generate token
            const token = jwt.sign({ _id: result._id, username: result.username },
                secret, {
                    expiresIn: "1h",
                }
            );
            res.json({
                token,
            });
        })
        .catch((error) => {
            next(createError(500));
        });
};

module.exports = { postLogin };