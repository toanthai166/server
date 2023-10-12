const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ImageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    data: {
      type: Buffer,
      default: false,
    },
    contentType: {
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

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
