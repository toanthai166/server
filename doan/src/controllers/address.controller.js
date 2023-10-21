const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { addressService } = require('../services');
const Category = require('../models/category.model');

const createAddress = catchAsync(async (req, res) => {
  const newAddress = {
    ...req.body,
    userId: req.user.id,
  };
  await addressService.createAddress(newAddress);
  res.status(httpStatus.CREATED).send(newAddress);
});

const changeIsDefaultAddress = catchAsync(async (req, res) => {
  if (!req.body.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'address not found');
  }

  const address = await addressService.getAddresById(req.body.id, req.body);
  res.send(address);
});

const getAddresses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await addressService.queryAddresses(filter, options);
  res.send(result);
});

const getAddress = catchAsync(async (req, res) => {
  const address = await addressService.getAddresById(req.params.id);
  res.send(address);
});

const updateAddress = catchAsync(async (req, res) => {
  const blog = await addressService.updateAddressById(req.params.id, req.body);
  res.send(blog);
});

const deleteAddress = catchAsync(async (req, res) => {
  await addressService.deleteBlogById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAddress,
  changeIsDefaultAddress,
  getAddresses,
  updateAddress,
  getAddress,
  deleteAddress,
};
