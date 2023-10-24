const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    productId: Joi.string().required(),
    total: Joi.number().required(),
    quantity: Joi.number().required(),
    note: Joi.string(),
    addressId: Joi.string().required(),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    userId: Joi.string(),
    status: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      id: Joi.required().custom(objectId),
      status: Joi.string().required(),
    })
    .min(1),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
};
