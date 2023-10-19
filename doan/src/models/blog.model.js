const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const Category = require('./category.model');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    category: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);
// Blog.belongsTo(Category, { foreignKey: 'categoryId' });

// add plugin that converts mongoose to json
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
