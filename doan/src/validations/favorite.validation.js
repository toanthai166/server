const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const addFavorite = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    blogId: Joi.string().required(),
  }),
};

const usergetFavorite = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};

const removeFavorite = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    postId: Joi.string().required(),
  }),
};

module.exports = {
  addFavorite,
  usergetFavorite,
  removeFavorite,
};
