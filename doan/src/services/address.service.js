const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Address = require('../models/address.model');
const Category = require('../models/category.model');

const createAddress = async (body) => {
  return Address.create(body);
};

const queryAddresses = async (filter, options) => {
  const addresses = await Address.paginate(filter, options);
  return addresses;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getAddresById = async (id) => {
  return Address.findById(id);
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
const updateAddressById = async (id, updateBody) => {
  const address = await getAddresById(id);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'address not found');
  }
  Object.assign(address, updateBody);
  await address.save();
  return address;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteBlogById = async (id) => {
  const address = await getAddresById(id);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'address not found');
  }
  await address.remove();
  return address;
};

module.exports = {
  createAddress,
  queryAddresses,
  getAddresById,
  updateAddressById,
  deleteBlogById,
};
