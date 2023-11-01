const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createAddress = {
  body: Joi.object().keys({
    addressName: Joi.string().required(),
    fullname: Joi.string().required(),
    phone: Joi.string().required(),
    addressMoreInfo: Joi.string().required(),
  }),
};

const getAddresses = {
  query: Joi.object().keys({
    userId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAddress = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
const changeIsDefaultAddress = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      id: Joi.string().custom(objectId),
      isDefault: Joi.boolean().required(),
    })
    .min(1),
};

const updateAddress = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      id: Joi.required().custom(objectId),
      fullname: Joi.string(),
      phone: Joi.string(),
      isDefault: Joi.boolean(),
      addressMoreInfo: Joi.string(),
      addressName: Joi.string(),
    })
    .min(1),
};

const deleteAddress = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAddress,
  getAddresses,
  getAddress,
  changeIsDefaultAddress,
  updateAddress,
  deleteAddress,
};
