const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Comment = require('../models/comment.model');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const createComment = async (commentBody) => {
  return Comment.create(commentBody);
};

const queryComments = async (filter, options) => {
  const comments = await Comment.paginate(filter, options);
  return comments;
};

const updateCommentById = async (commentId, updateBody) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  Object.assign(comment, updateBody);
  await comment.save();
  return comment;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteCommentById = async (commentId) => {
  const comment = Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  await comment.remove();
  return comment;
};

module.exports = {
  createComment,
  queryComments,
  updateCommentById,
  deleteCommentById,
};
