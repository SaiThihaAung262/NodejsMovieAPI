const { schema, loginSchema } = require("./userValidator");

module.exports = {
    userValidator: schema,
    loginSchema,
};