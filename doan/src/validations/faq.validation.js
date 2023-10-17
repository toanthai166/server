const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createFAQ = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    isActive: Joi.boolean(),
  }),
};

const getFAQ = {
  params: Joi.object().keys({
    faqId: Joi.string().custom(objectId),
  }),
};

const getFAQs = {
  query: Joi.object().keys({
    content: Joi.string(),
    isActive: Joi.boolean(),
  }),
  params: Joi.object().keys({
    isActive: Joi.boolean(),
  }),
};
const changeIsActiveFAQ = {
  params: Joi.object().keys({
    faqId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      id: Joi.string().custom(objectId),
      isActive: Joi.boolean().required(),
    })
    .min(1),
};

const updateFAQ = {
  params: Joi.object().keys({
    faqId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deleteFAQ = {
  params: Joi.object().keys({
    faqId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFAQ,
  deleteFAQ,
  updateFAQ,
  changeIsActiveFAQ,
  getFAQs,
  getFAQ,
};
