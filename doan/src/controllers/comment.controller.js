const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');
const Comment = require('../models/comment.model');

const createComment = catchAsync(async (req, res) => {
  const newComment = {
    ...req.body,
    author: req.user,
  };
  await commentService.createComment(newComment);
  res.status(httpStatus.CREATED).send(newComment);
});

const getCommentByBlogId = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const listCommentByBlog = await Comment.find({ blogId: blogId });

  res.send(listCommentByBlog);
});

const updateCommentById = catchAsync(async (req, res) => {
  // const newComment = {
  //   ...req.body,
  //   updateAt: Date.now(),
  // };
  const comment = await commentService.updateCommentById(req.params.commentId, req.body);
  res.send(comment);
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.params.commentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  deleteComment,
  updateCommentById,
  getCommentByBlogId,
  createComment,
};
