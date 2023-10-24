const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');
const Category = require('../models/category.model');
const generateOrderCode = require('../utils/function');

const createOrder = catchAsync(async (req, res) => {
  const orderCode = generateOrderCode();
  const newOrder = {
    ...req.body,
    userId: req.user.id,
    code: orderCode,
  };
  await orderService.createOrder(newOrder);
  res.status(httpStatus.CREATED).send(newOrder);
});

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);
  res.send(order);
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.id, req.body);
  res.send(order);
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
};
