const mongoose = require('mongoose');

const goodSchema = new mongoose.Schema({
  goodsId: {
    type: String,
    require: true,
  },
  goodsName: {
    type: String,
  },
  category: 'mobile',
  price: {
    type: Number,
  },
});

mongoose.model('product', goodSchema);
module.exports = product;
