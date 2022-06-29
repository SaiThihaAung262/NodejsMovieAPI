const authRouters = require("./auth");
const movieRouters = require("./movie");

module.exports = (app) => {
    app.use("/auth", authRouters);
    app.use("/api", movieRouters);
};