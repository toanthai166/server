const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Favorite = require('../models/favorite.model');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const createFavorite = async (userId, postId) => {
  // return Favorite.create(favoriteBody);
  const existingFavorite = await Favorite.findOne({ userId });

  if (existingFavorite) {
    existingFavorite.favoritePost = postId;
    return existingFavorite.save();
  } else {
    const favorite = new Favorite({
      userId,
      favoritePost: postId,
    });
    return favorite.save();
  }
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteFavorite = async (userId, postId) => {
  return Favorite.findOneAndUpdate({ userId }, { $pull: { favoritePosts: postId } });
};
const userGetFavorite = async (userId) => {
  try {
    const favorite = await Favorite.findOne({ userId: userId });

    if (!favorite) {
      return [];
    }

    const favoritePostIds = favorite.favoritePosts;
    const favoritePosts = await Post.find({ _id: { $in: favoritePostIds } });

    return favoritePosts;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createFavorite,
  userGetFavorite,
  deleteFavorite,
  // deleteFavorite,
};
