const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createComment = {
  body: Joi.object().keys({
    content: Joi.string().required(),
    blogId: Joi.string().required().custom(objectId),
    createAt: Joi.string(),
    updateAt: Joi.string(),
  }),
};

const getCommentByBlogId = {
  query: Joi.object().keys({
    content: Joi.string(),
  }),
};

const updateComment = {
  params: Joi.object().keys({
    commentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      content: Joi.string(),
      blogId: Joi.string().required().custom(objectId),
    })
    .min(1),
};

const deleteComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createComment,
  getCommentByBlogId,
  updateComment,
  deleteComment,
};
