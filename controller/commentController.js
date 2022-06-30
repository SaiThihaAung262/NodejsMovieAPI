const { ObjectID } = require("bson");
const createError = require("http-errors");
const { Comment } = require("../models");

const postComment = (req, res, next) => {
    /**
     *Parameters for created Comments
     * _id
     * userId>req.user._id
     * username>req.user.username
     * movieId>req.body.movieId
     * text>req.body.text
     */

    if (!ObjectID(req.query.movieId)) {
        return next(createError(400));
    }

    const error = Comment.validate(req.body["text"]);

    if (error) {
        return next(error);
    }

    const commentData = {
        text: req.body["text"],
    };
    commentData.userId = new ObjectID(req.user["_id"]);
    commentData.username = req.user["username"];
    commentData.movieId = new ObjectID(req.body["movieId"]);

    const comment = new Comment(commentData);
    comment
        .save()
        .then(() => {
            res.status(201).json({
                err_code: 200,
                err_message: "Comment created successfully",
            });
        })
        .catch((err) => {
            next(createError(500));
        });
};

module.exports = {
    postComment,
};