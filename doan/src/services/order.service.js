const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Order = require('../models/order.model');
const Address = require('../models/address.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

const createOrder = async (body) => {
  const addressId = body.addressId;
  const productId = body.productId;
  const userId = body.userId;
  const addresses = await Address.findById(addressId);
  if (!addresses) {
    throw new Error('address not found');
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('user not found');
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('product not found');
  }
  body.product = product.toObject();
  body.addresses = addresses.toObject();
  body.user = user.toObject();
  return Order.create({ ...body, product: product, addresses: addresses, user: user });
};

const queryOrders = async (filter, options) => {
  const orders = await Order.paginate(filter, options);
  return orders;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getOrderById = async (id) => {
  return Order.findById(id);
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
const updateOrderById = async (id, updateBody) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
};
