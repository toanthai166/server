const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { FAQService } = require('../services');
const FAQ = require('../models/faq.model');

const createFAQ = catchAsync(async (req, res) => {
  const newFAQ = {
    ...req.body,
    author: req.user,
  };
  await FAQService.createFAQ(newFAQ);
  res.status(httpStatus.CREATED).send(newFAQ);
});

const changeIsActiveFAQ = catchAsync(async (req, res) => {
  if (!req.params.faqId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
  }

  const FAQ = await FAQService.updateFAQById(req.params.faqId, req.body);
  res.send(FAQ);
});

const getFAQs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['isActive']);

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await FAQService.queryFAQs(filter, options);
  console.log(result);
  res.send(result);
});
const getFAQ = catchAsync(async (req, res) => {
  const FAQ = await FAQService.getFAQById(req.params.faqId);
  if (!FAQ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
  }
  res.send(FAQ);
});
const updateFAQById = catchAsync(async (req, res) => {
  console.log(req.body);
  const FAQ = await FAQService.updateFAQById(req.params.faqId, req.body);
  res.send(FAQ);
});

const deleteFAQ = catchAsync(async (req, res) => {
  await FAQService.deleteFAQById(req.params.faqId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  deleteFAQ,
  getFAQs,
  updateFAQById,
  changeIsActiveFAQ,
  createFAQ,
  getFAQ,
};
