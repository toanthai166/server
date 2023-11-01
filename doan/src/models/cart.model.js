const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const Category = require('./category.model');

const cartItemSchema = mongoose.Schema({
  product: {
    type: Object,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = mongoose.Schema({
  products: [cartItemSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// add plugin that converts mongoose to json
cartSchema.plugin(toJSON);
cartSchema.plugin(paginate);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
