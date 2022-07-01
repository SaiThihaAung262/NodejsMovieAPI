const { dbCon } = require("../configuration");
const { ObjectID } = require("bson");
const createError = require("http-errors");

const getMovies = (req, res, next) => {
  if (isNaN(req.query.page) || isNaN(req.query.pagesize)) {
    return next(createError(400));
  }

  let page = req.query.page ? parseInt(req.query.page) : 1;
  let pageSize = req.query.pagesize ? parseInt(req.query.pagesize) : 10;
  let searchParam = {};

  if (req.query.id !== undefined) {
    searchParam._id = new ObjectID(req.query.id);
  }

  const moviesToSkip = (page - 1) * pageSize;
  dbCon("movies", async (db) => {
    const movies = await db
      .find(searchParam)
      .sort({ createdAt: -1 })
      .skip(moviesToSkip)
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

module.exports = { getMovies };
