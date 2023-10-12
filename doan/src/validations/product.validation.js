const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number(),
    imageLink: Joi.string(),
    isActive: Joi.boolean(),
    unitPrice: Joi.number(),
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
    productId: Joi.string().custom(objectId),
  }),
};

const changeIsActiveProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      isActive: Joi.boolean().required(),
    })
    .min(1),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    imageLink: Joi.string(),
    quantity: Joi.string(),
    isActive: Joi.boolean(),
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  changeIsActiveProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
