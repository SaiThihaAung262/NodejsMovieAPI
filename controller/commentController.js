const { ObjectID } = require("bson");
const createError = require("http-errors");
const { Comment } = require("../models");
const { dbCon } = require("../configuration");

const postComment = (req, res, next) => {
  /**
   *Parameters for created Comments
   * _id
   * userId>req.user._id
   * username>req.user.username
   * movieId>req.body.movieId
   * text>req.body.text
   */

  console.log(req.body);

  if (!ObjectID.isValid(req.body.movieId)) {
    console.log("Here is error of movie id");
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
        err_message: "Comment created successfully",
      });
    })
    .catch((err) => {
      next(createError(500));
    });
};

const putComment = (req, res, next) => {
  if (!ObjectID.isValid(req.body.commentId)) {
    return next(createError(400));
  }

  const error = Comment.validate(req.body["text"]);

  if (error) {
    return next(error);
  }

  const commentId = new ObjectID(req.body.commentId);
  Comment.edit(commentId, req.body.text)
    .then(() => {
      res.status(201).json({
        err_message: "Update comment successfully",
      });
    })
    .catch((error) => {
      next(createError(500));
    });
};

const deleteComment = (req, res, next) => {
  if (!ObjectID.isValid(req.body.commentId)) {
    return next(createError(400));
  }
  const commentId = new ObjectID(req.body.commentId);

  Comment.delete(commentId)
    .then(() => {
      res.status(201).json({
        err_message: "Delete comment successfully",
      });
    })
    .catch((error) => {
      next(createError(500));
    });
};

const getComment = (req, res, next) => {
  if (isNaN(req.query.page) || isNaN(req.query.pagesize)) {
    return next(createError(400));
  }
  let page = req.query.page ? parseInt(req.query.page) : 1;
  let pageSize = req.query.pagesize ? parseInt(req.query.pagesize) : 10;

  let searchParam = {};

  if (req.query.movieId !== undefined) {
    searchParam.movieId = new ObjectID(req.query.movieId);
  }
  const commentsToSkip = (page - 1) * pageSize;
  dbCon("comments", async (db) => {
    const movies = await db
      .find(searchParam)
      .sort({ createdAt: -1 })
      .skip(commentsToSkip)
      .limit(pageSize)
      .toArray();

    const total = await db.find(searchParam).count();

    if (movies.length > 0) {
      res.json({
        err_code: 200,
        err_message: "Success",
        total: total,
        data: movies,
      });
    } else {
      next(createError(404));
    }
  });
};

module.exports = {
  postComment,
  putComment,
  deleteComment,
  getComment,
};
