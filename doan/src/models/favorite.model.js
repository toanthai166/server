const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const Category = require('./category.model');

const FavoriteSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    favoritePost: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  },
  { timestamps: true }
);
// Blog.belongsTo(Category, { foreignKey: 'categoryId' });

// add plugin that converts mongoose to json
FavoriteSchema.plugin(toJSON);
FavoriteSchema.plugin(paginate);

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;
