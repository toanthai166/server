const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createBlog = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    imageLink: Joi.string(),
    categoryId: Joi.string().required(),
    isActive: Joi.boolean(),
    isFavorite: Joi.boolean(),
  }),
};

const getBlogs = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    categoryId: Joi.string(),
    isActive: Joi.boolean(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId),
  }),
};
const changeIsFavoriteBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      content: Joi.string(),
      imageLink: Joi.string(),
      categoryId: Joi.string(),
      isActive: Joi.boolean(),
      isFavorite: Joi.boolean().required(),
    })
    .min(1),
};
const changeIsActiveBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      blogId: Joi.string().custom(objectId),
      isActive: Joi.boolean().required(),
    })
    .min(1),
};

const updateBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      id: Joi.required().custom(objectId),
      title: Joi.string(),
      content: Joi.string(),
      imageLink: Joi.string(),
      categoryId: Joi.string(),
      isActive: Joi.boolean(),
      isFavorite: Joi.boolean(),
    })
    .min(1),
};

const deleteBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBlog,
  getBlogs,
  changeIsFavoriteBlog,
  changeIsActiveBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
