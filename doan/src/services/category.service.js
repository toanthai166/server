const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Category = require('../models/category.model');

const createCategory = async (categoryBody) => {
  return Category.create(categoryBody);
};
const getCategoryById = async (id) => {
  return Category.findById(id);
};

const queryCategoires = async (filter, options) => {
  const categories = await Category.paginate(filter, options);
  return categories;
};
/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = Category.findById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  queryCategoires,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
