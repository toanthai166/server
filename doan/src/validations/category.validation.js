const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    isActive: Joi.boolean(),
    categoryId: Joi.string().custom(objectId),
    createAt: Joi.string(),
    updateAt: Joi.string(),
  }),
};

const getCategorys = {
  query: Joi.object().keys({
    name: Joi.string(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    isActive: Joi.boolean(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      id: Joi.required().custom(objectId),
      isActive: Joi.boolean(),
    })
    .min(1),
};
const changeIsActiveCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      categoryId: Joi.string().custom(objectId),
      isActive: Joi.boolean().required(),
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategory,
  changeIsActiveCategory,
  getCategorys,
  getCategory,
  updateCategory,
  deleteCategory,
};
