const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createFeedback = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    phone: Joi.string(),
    fullname: Joi.string().required(),
    content: Joi.string().required(),
    answer: Joi.string(),
    status: Joi.string(),
  }),
};

const getFeedbacks = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    categoryId: Joi.string(),
    isActive: Joi.boolean(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFeedback = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateFeedback = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      id: Joi.required().custom(objectId),
      answer: Joi.string(),
      status: Joi.string(),
    })
    .min(1),
};

const deleteBlog = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFeedback,
  updateFeedback,
  getFeedback,
  getFeedbacks,
};
