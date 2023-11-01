const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const addToCart = async (body) => {
  console.log(body);
  console.log(1);
  return Cart.create(body);
};

const updateCart = async (id, updateBody) => {
  const products = updateBody;
  console.log(2);
  const cart = await Cart.findById(id);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cart not found');
  }
  Object.assign(cart, updateBody);
  try {
    await cart.save();
  } catch (error) {
    console.error('Lỗi cơ sở dữ liệu:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Lỗi cơ sở dữ liệu');
  }
  // await cart.save();
  return cart;
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
  addToCart,
  updateCart,
};
