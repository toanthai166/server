const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const Category = require('./category.model');

const feedbackSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['done', 'waiting'],
      default: 'waiting',
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

feedbackSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.createdAt = doc.createdAt;
    ret.updatedAt = doc.updatedAt;
  },
});
// Blog.belongsTo(Category, { foreignKey: 'categoryId' });

// add plugin that converts mongoose to json
feedbackSchema.plugin(toJSON);
feedbackSchema.plugin(paginate);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
