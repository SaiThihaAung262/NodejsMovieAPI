const Joi = require("@hapi/joi");
const schema = Joi.object({
  username: Joi.string().alphanum().required().min(3).max(10),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    )
    .message(
      "Your password should at least one upper case, lower case, one digit and one special character. And minimun eight in length"
    )
    .required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  schema,
  loginSchema,
};
