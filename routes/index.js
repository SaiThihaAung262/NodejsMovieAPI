const authRouters = require("./auth");
const movieRouters = require("./movie");
const commentRouters = require("./comment");

module.exports = (app) => {
    app.use("/auth", authRouters);
    app.use("/api", movieRouters);
    app.use("/api", commentRouters);
};