const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Blog = require('../models/blog.model');
const Category = require('../models/category.model');

const createBlog = async (blogBody) => {
  return Blog.create(blogBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBlogs = async (filter, options) => {
  const blogs = await Blog.paginate(filter, options);
  return blogs;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getBlogById = async (id) => {
  return Blog.findById(id);
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
const updateBlogById = async (blogId, updateBody) => {
  const blog = await getBlogById(blogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  Object.assign(blog, updateBody);
  await blog.save();
  return blog;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteBlogById = async (blogId) => {
  const blog = await getBlogById(blogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  await blog.remove();
  return blog;
};

module.exports = {
  createBlog,
  queryBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
