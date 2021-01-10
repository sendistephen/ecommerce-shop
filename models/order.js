const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrederSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
    },
  ],
  estimatedDelivery: String,
});
module.exports = mongoose.model('Order', OrederSchema);
