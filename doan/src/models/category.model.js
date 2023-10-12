const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createAt: {
      type: String,
    },
    updateAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
CategorySchema.plugin(toJSON);
CategorySchema.plugin(paginate);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
