const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Feedback = require('../models/contact.model');
const Category = require('../models/category.model');

const createFeedback = async (body) => {
  return Feedback.create(body);
};

const queryFeedbacks = async (filter, options) => {
  const feedbacks = await Feedback.paginate(filter, options);
  return feedbacks;
};

const getFeedbackById = async (id) => {
  return Feedback.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateFeedbackById = async (id, updateBody) => {
  const feedback = await getFeedbackById(id);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  Object.assign(feedback, updateBody);
  await feedback.save();
  return feedback;
};

module.exports = {
  createFeedback,
  updateFeedbackById,
  getFeedbackById,
  queryFeedbacks,
};
