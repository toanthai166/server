const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cartService } = require('../services');
const Category = require('../models/category.model');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

const addToCart = catchAsync(async (req, res) => {
  const newProducts = {
    ...req.body,
    userId: req.user.id,
  };
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId });
  if (cart === null) {
    const products = [];
    const foundProduct = await Product.findById(req.body.id);
    products.push({
      product: foundProduct,
      quantity: req.body.quantity,
    });
    await cartService.addToCart({ ...newProducts, products: products });
    res.status(httpStatus.CREATED).send({ ...newProducts, products: products });
  } else {
    const foundProduct = await Product.findById(req.body.id);
    cart.products.push({
      product: foundProduct,
      quantity: req.body.quantity,
    });
    const cartItem = await cartService.updateCart(cart.id, { products: cart.products });
    res.send(cartItem);
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

const getBlog = catchAsync(async (req, res) => {
  const blog = await blogService.getBlogById(req.params.blogId);
  const content = blog.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  const { isActive, isFavorite, _id, title, categoryId, image } = blog;
  const newblog = { isActive, isFavorite, _id, title, categoryId, image, content: content };
  res.send(newblog);
});

const updateBlog = catchAsync(async (req, res) => {
  const blog = await blogService.updateBlogById(req.params.blogId, req.body);
  res.send(blog);
});

const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteBlogById(req.params.blogId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  addToCart,
  myCarts,
  removeToCart,
};
