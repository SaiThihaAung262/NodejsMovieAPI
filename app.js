const express = require("express");
const { middleware } = require("./middlewares");
const routes = require("./routes");
const createError = require("http-errors");
const { logger } = require("./configuration");
const cors = require("cors");

const app = express();

app.use(cors());

/**
 * middleware
 */
middleware(app);

/**
 * routes
 */
routes(app);

app.use((req, res, next) => {
  const error = createError(404);
  next(error);
});

app.use((error, req, res, next) => {
  logger.error(error.message);
  const status = error.statusCode || 500;
  res.json({
    err_code: status,
    err_message: error.message,
  });
});

module.exports = app;
