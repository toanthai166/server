const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { favoriteService } = require('../services');
const Favorite = require('../models/favorite.model');

const createFavorite = catchAsync(async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const result = await favoriteService.createFavorite(userId, postId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // const checkFavorite = await Favorite.findOne({
  //   author: req.user.id,
  //   blog: req.body.blogId,
  // });

  // if (checkFavorite) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'blog đã tồn tại trong danh sách yêu thích');
  // }

  // const newFavorite = await Favorite.create({
  //   userId: req.user.id,
  //   blogId: req.body.blogId,
  // });
  // await favoriteService.createFavorite(newFavorite);
  // res.status(httpStatus.CREATED).send(newFavorite);
});
const userGetFavorite = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  if (req.query.title) {
    const titleRegex = new RegExp(req.query.title, 'i');

    filter.title = titleRegex;
  }
  const result = await favoriteService.userGetFavorite(filter, options);
  res.send(result);
});

const deleteFavorite = catchAsync(async (req, res) => {
  const favorite = {
    author: req.user.id,
    blog: req.body.blogId,
  };
  console.log(favorite);

  await favoriteService.deleteFavorite(favorite.author, favorite.blog);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFavorite,
  userGetFavorite,
  deleteFavorite,
};
