const { result } = require("@hapi/joi/lib/base");
const { User } = require("../../models");
const createError = require("http-errors");
const { readFileSync } = require("fs");
const jwt = require("jsonwebtoken");

const postRegister = (req, res, next) => {
    const validation = User.validate(req.body);

    /**
     * cheeck validation
     */
    if (validation.error) {
        const error = new Error(validation.error.message);
        error.statusCode = 400;
        return next(error);
    }

    /**
     * check user exit or not
     */
    const user = new User(req.body);

    user
        .checkExistance()
        .then((result) => {
            if (result.check) {
                const error = new Error(result.message);
                error.statusCode = 409;
                return next(error);
            }

            /**
             * insert user
             */
            user.save((err) => {
                if (err) {
                    return next(createError(500));
                }

                //read secret key
                const secret = readFileSync("./private.key");

                //generate token
                const token = jwt.sign({ _id: user.userData._id, username: user.userData.username },
                    secret, {
                        expiresIn: "1h",
                    }
                );

                res.json({
                    err_code: 201,
                    token: token,
                    err_message: "user created successfully",
                });
            });
        })
        .catch((err) => {
            next(createError(500));
        });
};

module.exports = { postRegister };