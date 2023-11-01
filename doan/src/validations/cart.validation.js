const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
const addToCart = {
  body: Joi.object().keys({
    id: Joi.string(),
    quantity: Joi.number().required(),
  }),
};

const myCarts = {
  query: Joi.object().keys({
    userId: Joi.string(),
    sortBy: Joi.string(),
    isActive: Joi.boolean(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCart = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateCart = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    id: Joi.required().custom(objectId),
    quantity: Joi.number(),
  }),
};

const removeToCart = {
  body: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  addToCart,
  updateCart,
  myCarts,
  removeToCart,
  getCart,
};
