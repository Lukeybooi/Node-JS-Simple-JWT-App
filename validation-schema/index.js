const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required(),
});

module.exports = { authSchema };
