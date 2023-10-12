const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  const blog = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(blog);
});

const getCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategoires(filter, options);
  res.send(result);
});

// const getBlog = catchAsync(async (req, res) => {
//   const blog = await blogService.getBlogById(req.params.blogId);
//   if (!blog) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
//   }
//   res.send(blog);
// });

const updateCategory = catchAsync(async (req, res) => {
  console.log('id', req.params.categoryId);
  const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategoryById(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

const changeIsActiveCategory = catchAsync(async (req, res) => {
  if (!req.body.categoryId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const blog = await categoryService.updateCategoryById(req.body.categoryId, req.body);
  res.send(blog);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
  }
  res.send(category);
});

module.exports = {
  changeIsActiveCategory,
  createCategory,
  getCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
