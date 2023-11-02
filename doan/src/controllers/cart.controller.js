const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cartService } = require('../services');
const Category = require('../models/category.model');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const { log } = require('../config/logger');

const addToCart = catchAsync(async (req, res) => {
  const newProducts = {
    ...req.body,
    userId: req.user.id,
  };
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId });
  const foundProduct = await Product.findById(req.body.id);
  if (cart === null) {
    const products = [];
    products.push({
      product: foundProduct,
      quantity: req.body.quantity,
    });
    await cartService.addToCart({ ...newProducts, products: products });
    res.status(httpStatus.CREATED).send({ ...newProducts, products: products });
  } else {
    const productToUpdate = cart.products.find((item) => {
      return item.product._id == req.body.id;
    });
    if (productToUpdate) {
      const newCart = cart.products.filter((item) => {
        return String(item.product._id) !== req.body.id;
      });
      productToUpdate.quantity += req.body.quantity;
      newCart.push(productToUpdate);
      const cartItem = await cartService.updateCart(cart.id, { products: newCart });
      res.send(cartItem);
    } else {
      cart.products.push({
        product: foundProduct,
        quantity: req.body.quantity,
      });
      const cartItem = await cartService.updateCart(cart.id, { products: cart.products });
      res.send(cartItem);
    }

    // const cartItem = await cartService.updateCart(cart.id, { products: cart.products });
    // res.send(cartItem);
  }
});

const removeToCart = catchAsync(async (req, res) => {
  const newProducts = {
    ...req.body,
    userId: req.user.id,
  };
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId });
  const newData = cart.products.filter((item) => item.product.id !== req.body.productId);

  const cartItem = await cartService.updateCart(cart.id, { products: newData });
  res.send(cartItem);
});

const myCarts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cartService.myCarts(filter, options);
  res.send(result);
});

module.exports = {
  addToCart,
  myCarts,
  removeToCart,
};
