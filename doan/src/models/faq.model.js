const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { boolean } = require('joi');

const FAQSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
FAQSchema.plugin(toJSON);
FAQSchema.plugin(paginate);

const FAQ = mongoose.model('FAQ', FAQSchema);

module.exports = FAQ;
