const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { contactService } = require('../services');
const Category = require('../models/category.model');

const createFeedback = catchAsync(async (req, res) => {
  await contactService.createFeedback(req.body);
  res.status(httpStatus.CREATED).send(req.body);
});

const getFeedbacks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['categoryId', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await contactService.queryFeedbacks(filter, options);
  res.send(result);
});

const getFeedback = catchAsync(async (req, res) => {
  const feedback = await contactService.getFeedbackById(req.params.id);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'feedback not found');
  }
  res.send(feedback);
});

const updateFeedback = catchAsync(async (req, res) => {
  const feedback = await contactService.updateFeedbackById(req.params.id, req.body);
  res.send(feedback);
});

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback,
};
