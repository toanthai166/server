const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const Product = require('./product.model');

const orderSchema = mongoose.Schema(
  {
    code: {
      type: String,
    },
    addresses: { type: Object },
    status: {
      type: String,
      enum: ['wait_for_confirm', 'shipping', 'cancel', 'complete', 'delivered'],
      default: 'WAIT_FOR_CONFIRM',
    },
    note: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    total: { type: Number, default: 0 },
    product: [Product],
  },
  {
    timestamps: true,
  }
);
// Blog.belongsTo(Category, { foreignKey: 'categoryId' });

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
