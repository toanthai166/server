const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    author: {
      type: String,
      require: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// Blog.belongsTo(Category, { foreignKey: 'categoryId' });

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
