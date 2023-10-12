const Joi = require('joi');

const imageValidationSchema = {
  name: Joi().string().required(),
  data: Joi().binary().required(),
  contentType: Joi().string().required(),
};

module.exports = {
  imageValidationSchema,
};
