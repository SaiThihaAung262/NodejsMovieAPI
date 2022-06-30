const Joi = require("@hapi/joi");

class Comment {
    constructor(commentData) {
        this.data = commentData;
        this.data.createdAt = new Date();
        this.data.updatedAt = new Date();
    }

    static validate(commentData) {
        const validation = Joi.string().max(300).validate(commentData["body"]);

        if (validation.error) {
            const error = new Error(validate.error.message);
            error.statusCode = 400;
            return error;
        }

        return null;
    }
}

module.exports = Comment;