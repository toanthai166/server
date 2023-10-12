const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const FAQ = require('../models/faq.model');

const createFAQ = async (faqBody) => {
  return FAQ.create(faqBody);
};

const queryFAQs = async (filter, options) => {
  const faq = await FAQ.paginate(filter, options);
  return faq;
};

const getFAQById = async (faqId) => {
  return FAQ.findById(faqId);
};

const updateFAQById = async (faqId, updateBody) => {
  const faq = await FAQ.findById(faqId);
  if (!faq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
  }
  Object.assign(faq, updateBody);
  await faq.save();
  return faq;
};

const deleteFAQById = async (faqId) => {
  const faq = await FAQ.findById(faqId);
  if (!faq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ not found');
  }
  await faq.remove();
  return faq;
};

module.exports = {
  createFAQ,
  queryFAQs,
  updateFAQById,
  deleteFAQById,
  getFAQById,
};
