const { Joi } = require('celebrate');

const objValidateCardId = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
};

const objValidateAuth = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
};

module.exports = {
  objValidateCardId,
  objValidateAuth,
};
