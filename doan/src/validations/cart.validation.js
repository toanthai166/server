const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
const addToCart = {
  body: Joi.object().keys({
    id: Joi.string(),
    quantity: Joi.number().required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    isActive: Joi.boolean(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const changeIsActiveProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      id: Joi.string().custom(objectId),
      isActive: Joi.boolean().required(),
    })
    .min(1),
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

const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addToCart,
  updateCart,
};
