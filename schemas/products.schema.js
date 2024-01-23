const mongoose = require('mongoose');

const goodSchema = new mongoose.Schema(
  {
    goodsId: { type: String, require: true },
    content: { type: String, require: true },
    author: { type: String, require: true },
    password: { type: String, require: true },
    status: {
      type: String,
      enum: ['FOR_SALE', 'SOLD_OUT'],
      default: 'FOR_SALE',
    },
  },
  { timestamps: true }
);

mongoose.model('product', goodSchema);
module.exports = product;
